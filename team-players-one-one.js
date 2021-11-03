const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("newdatabase", "root", "", {
    host: "localhost",
    dialect: 'mysql',
});

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    const team1 = sequelize.define('team1', {
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

    const players1 = sequelize.define('players1', {
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

    await team1.sync();
    team1.hasOne(players1);
    await players1.sync();
    console.log('Tạo bảng thành công!');

    await team1.create({
        name: 'team 1'
    });
    await players1.create({
        name: 'player 1',
        team1Id: 1
    });
    await players1.create({
        name: 'player 2',
        team1Id: 1
    });
    console.log('Chèn dữ liệu thành công!');

    const options = {
        where: { id: 1 },
        include: [
            {
                model: players1,
            }
        ],
    };
    const data = await team1.findAll(options);
    console.log(JSON.stringify(data, null, 2));

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();