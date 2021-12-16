const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const Project = sequelize.import('./Barsv4');

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    await Project.sync({ force: true });
    console.log('Tạo bảng thành công!');

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();