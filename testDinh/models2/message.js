const { sequelize, DataTypes } = require('sequelize');

/**
 * Message model
 * @author PhuPT
 */
module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.ENUM,
      values: ['attendee', 'event'],
      defaultValue: 'attendee',
      validate: {
        isIn: [['attendee', 'event']]
      }
    }
  });

  return Message;
};
