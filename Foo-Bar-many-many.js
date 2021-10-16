const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("newdatabase", "root", "123456", {
    host: "localhost",
    dialect: 'mysql',
});

(async () => {
    const Foo = sequelize.define('Foo', { name: DataTypes.TEXT });
    const Bar = sequelize.define('Bar', { name: DataTypes.TEXT });
    Foo.belongsToMany(Bar, { through: 'Foo_Bar' });
    Bar.belongsToMany(Foo, { through: 'Foo_Bar' });

    await sequelize.sync();
    const foo = await Foo.create({ name: 'foo' });
    const bar = await Bar.create({ name: 'bar' });
    await foo.addBar(bar);
    const data = await Foo.findOne({ include: Bar });
    console.log(JSON.stringify(data, null, 2));

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();