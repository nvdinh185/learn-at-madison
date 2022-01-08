const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databaseSqlite.db'
});

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    const team = sequelize.define('team', {
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

    const players = sequelize.define('players', {
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

    await team.sync();
    team.hasMany(players);
    await players.sync();
    console.log('Tạo bảng thành công!');

    await team.create({
        name: 'team 1'
    });
    await players.create({
        name: 'player 1',
        teamId: 1
    });
    await players.create({
        name: 'player 2',
        teamId: 1
    });
    console.log('Chèn dữ liệu thành công!');

    const options = {
        where: { id: 1 },
        include: [
            {
                model: players,
            }
        ],
    };
    const data = await team.findAll(options);
    console.log(JSON.stringify(data, null, 2));

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();