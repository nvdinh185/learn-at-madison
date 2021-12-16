module.exports = (sequelize, DataTypes) => {
    const Bars = sequelize.define('Bars', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100)
        },
    }, {
        timestamps: false
    });

    return Bars;
};