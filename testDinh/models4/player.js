/**
 * Player model
 * @author DinhNguyen
 */
module.exports = (sequelize, DataTypes) => {
  var Player = sequelize.define('Player', {
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

  Player.associate = models => {
    Player.belongsTo(models.Team);
  };

  return Player;
};
