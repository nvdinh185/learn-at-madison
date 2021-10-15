const { sequelize, DataTypes } = require('sequelize');

/**
 * TicketType model
 * @author KimThi
 */
module.exports = function (sequelize, DataTypes) {
  var TicketType = sequelize.define('TicketType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [0, 50]
      }
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    }
  });

  TicketType.associate = models => {
    TicketType.hasMany(models.TicketSetting, { as: 'ticketSettings' });
    TicketType.belongsTo(models.Event);
  };

  return TicketType;
};
