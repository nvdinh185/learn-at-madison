/**
 * Team model
 * @author DinhNguyen
 */
module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define('Team', {
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

  Team.associate = models => {
    Team.hasMany(models.Player);
  };

  return Team;
};
