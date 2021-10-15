const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.db'
// });
const sequelize = new Sequelize("newdatabase2", "root", "", {
    host: "localhost",
    port: 3307,
    dialect: 'mysql',
});

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    let foos = sequelize.define('foos', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    foos.associate = models => {
        foos.hasOne(models.bars);
    };

    let bars = sequelize.define('bars', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        fooId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
    bars.associate = models => {
        bars.belongsTo(models.foos);
    };

    await foos.sync({ force: true });
    await bars.sync({ force: true });
    console.log('Tạo bảng thành công!');

    await foos.create({
        name: 'foos doe 1'
    });
    await bars.create({
        name: 'bars doe 1',
        fooId: 1
    });
    console.log('Chèn dữ liệu thành công!');

    /*const attributes = ['id', 'name'];
    const options = {
        where: { id: 1 },
        attributes: attributes,
        // attributes: {
        //     exclude: ['name']
        // },
        include: [//age
            // { all: true }
            { model: bars, attributes: attributes }
            // {
            //     model: this.db.Foos,
            //     as: 'foos',
            //     //include: ['Attendee', 'TicketSetting']
            // }
        ],
        // paranoid: false,
        // order: [[{ model: age, as: 'age' }, 'username', 'DESC']]
        //transaction
    };*/

    const options = {
        where: { id: 1 },
        attributes: ['id', 'name'],
        // attributes: {
        //     exclude: ['name']
        // },
        include: [
            {
                model: foos,
                attributes: ['id', 'name']
            }
        ],
        // paranoid: false,
        // order: [[{ model: age, as: 'age' }, 'username', 'DESC']]
        //transaction
    };
    const foosData = await bars.findAll(options);
    console.log(foosData);

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();