const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("newdatabase", "root", "123456", {
    host: "localhost",
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

    let bars = sequelize.define('bars', {
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

    await foos.sync();
    // foos.hasOne(bars);
    bars.belongsTo(foos);
    await bars.sync();
    console.log('Tạo bảng thành công!');

    /*await foos.create({
        name: 'foos 2'
    });*/
    await bars.create({
        name: 'bars 2',
        fooId: 2
    });
    console.log('Chèn dữ liệu thành công!');

    const options = {
        where: { id: 2 },
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
    };
    const data = await bars.findAll(options);
    console.log(JSON.stringify(data, null, 2));

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();