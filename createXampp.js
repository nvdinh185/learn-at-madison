const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const MODEL_PATH = `${__dirname}/testDinh/models3`;
const sequelize = new Sequelize("newdatabase", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
});

fs.readdir(MODEL_PATH, async (err, files) => {
    if (err) {
        console.log(err);
    } else {
        const db = {};
        // fetch all files in models folder
        files.forEach(file => {
            if (file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js') {
                // console.log(path.join(`${__dirname}/` + file));
                const model = sequelize.import(path.join(MODEL_PATH, file));
                // console.log(`model name: ${JSON.stringify(model.name)} == ${path.join(`${__dirname}/`, file)}`);
                db[model.name] = model;
            }
        });

        console.log(`model name length: ${JSON.stringify(db)} == ${files.length}`);

        // make constrain for model
        Object.keys(db).forEach(modelName => {
            if ('associate' in db[modelName]) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;

        //sync db
        await db.sequelize.sync({ force: true });

        console.log('Sync database success!');

        // init data
        const DATA_PATH = './testDinh/initDataModules/';
        const INIT_TABLES = [
            'Foos',
            'Bars',
        ];

        // console.log(123);
        await db.sequelize.transaction(async t => {
            let options = { raw: true, transaction: t };
            await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
                .then(() => Promise.mapSeries(INIT_TABLES,
                    table => db[table].truncate({ cascade: true })
                ))
                .then(() => Promise.mapSeries(INIT_TABLES,
                    async table => { // insert new data
                        let data = require(`${DATA_PATH}${table}`);
                        await db[table].bulkCreate(data);
                    }
                ))
                .then(() => db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options));
        });

        // console.log(456);
        //select data
        const Foos = await db.Foos.findOne({ where: { id: 1 } });
        console.log(Foos.dataValues);
        const Bars = await db.Bars.findOne({ where: { id: 1 } });
        console.log(Bars.dataValues);

        const options = {
            where: { id: 1 },
            attributes: ['id', 'name1'],
            // attributes: {
            //     exclude: ['name']
            // },
            include: [
                {
                    model: db.Foos,
                    attributes: ['id', 'name2']
                }
            ],
            // order: [[{ model: age, as: 'age' }, 'username', 'DESC']]
        };

        const data = await db.Bars.findAll(options);
        console.log(JSON.stringify(data, null, 2));

        await db.sequelize.close();
    }
});