const { Sequelize } = require('sequelize');

/**
 * Player model
 * @author DinhNguyen
 */
module.exports = (sequelize) => {
  var Player = sequelize.define('Player', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name1: {
      type: Sequelize.STRING(100)
    },
    name2: {
      type: Sequelize.STRING(100)
    },
    name3: {
      type: Sequelize.STRING(100)
    },
  }, {
    timestamps: false
  });

  Player.associate = models => {
    Player.belongsTo(models.Team);
  };

  return Player;
};
