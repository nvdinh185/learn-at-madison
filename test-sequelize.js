const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
});

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    age: DataTypes.INTEGER,
}, {
    sequelize
});

(async () => {
    // await User.sync({ force: true });
    await User.create({
        username: 'jane doe 4',
        birthday: new Date(1980, 6, 20),
        age: 4
    });
    // const users1 = await User.findAll({ include: [{ all: true }] });
    // console.log(users1);
    const attributes = ['id', 'username'];
    const options = {
        where: { id: 1 },
        attributes: attributes,
        // include: [//age
        //     // { all: true }
        //     { model: bar, attributes: attributes }
        //     // {
        //     //     model: this.db.Foos,
        //     //     as: 'foos',
        //     //     //include: ['Attendee', 'TicketSetting']
        //     // }
        // ],
        // paranoid: false,
        // order: [[{ model: age, as: 'age' }, 'username', 'DESC']]
        //transaction
    };

    const users = await User.findAll(options);
    console.log(JSON.stringify(users, null, 2));


    await sequelize.close();
})();