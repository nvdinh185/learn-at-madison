const { Sequelize } = require('sequelize');

/**
 * Team model
 * @author DinhNguyen
 */
module.exports = (sequelize) => {
  var Team = sequelize.define('Team', {
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

  Team.associate = models => {
    Team.hasOne(models.Player);
  };

  return Team;
};
