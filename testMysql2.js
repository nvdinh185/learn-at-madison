const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const MODEL_PATH = `${__dirname}/testDinh/models2`;
const sequelize = new Sequelize("test-db-new", "root", "123456", {
    host: "localhost",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: true
    }
});

fs.readdir(MODEL_PATH, async (err, files) => {
    if (err) {
        console.log(err);
    } else {
        const db = {};
        // fetch all files in models folder
        files.forEach(file => {
            if (file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js') {
                let model = sequelize.import(path.join(MODEL_PATH, file));
                // console.log(`model: ${JSON.stringify(model.name)} == ${path.join(MODEL_PATH, file)}`);
                db[model.name] = model;
            }
        });

        console.log(`model name length: ${files.length}`);
        console.log(db);

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
            'Event',
            'TicketType',
            'Order',
            'TicketSetting'
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

        // CRUD
        await db.Event.create({ title: 'HITB Event 5', eventPageUrl: 'hitb_event_5' });
        await db.Event.update(
            { title: 'HITB Event 5 edit', eventPageUrl: 'hitb_event_5 edit' },
            { where: { id: 5 } }
        );
        //select data
        const event = await db.Event.findOne({ where: { id: 1 } });
        console.log(event.dataValues);
        const message = await db.Message.findOne({ where: { id: 1 } });
        console.log(message);
        const ticketType = await db.TicketType.findOne({ where: { id: 1 } });
        console.log(ticketType.dataValues);
        const ticketSetting = await db.TicketSetting.findOne({ where: { id: 1 } });
        console.log(ticketSetting.dataValues);

        //delete
        await db.Event.destroy(
            { where: { id: 4 } }
        );

        //select all
        const eventAll2 = await db.Event.findAll({ where: { timeZone: 8 } });
        console.log(eventAll2[1].dataValues);
        const eventAll1 = await db.Event.findAll();
        console.log(eventAll1.length);

        // count
        const count = await db.Event.count({ where: { timeZone: 8 } });
        console.log(count);

        await sequelize.close();
    }
});