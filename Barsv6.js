const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Bars = sequelize.define('Bars', {
        name: Sequelize.STRING,
        description: Sequelize.TEXT
    }, {
        timestamps: false
    });

    return Bars;
};