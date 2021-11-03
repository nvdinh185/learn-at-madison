const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("newdatabase", "root", "", {
    host: "localhost",
    dialect: 'mysql',
});

(async () => {
    const TeamN = sequelize.define('TeamN', { name: DataTypes.TEXT });
    const PlayersN = sequelize.define('PlayersN', { name: DataTypes.TEXT });
    TeamN.belongsToMany(PlayersN, { through: 'TeamN_PlayersN' });
    PlayersN.belongsToMany(TeamN, { through: 'TeamN_PlayersN' });

    await sequelize.sync();
    const teamN = await TeamN.create({ name: 'TeamN' });
    const playersN = await PlayersN.create({ name: 'PlayersN' });
    await teamN.addPlayersN(playersN);
    const data = await TeamN.findOne({ include: PlayersN });
    console.log(JSON.stringify(data, null, 2));

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();