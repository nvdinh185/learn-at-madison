const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const Bars = require('./Barsv6')(sequelize);

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    await Bars.sync({ force: true });
    console.log('Tạo bảng thành công!');

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();