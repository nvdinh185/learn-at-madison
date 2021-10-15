/**
 * TicketSetting model
 * @author KimThi
 */
module.exports = (sequelize, DataTypes) => {
  var TicketSetting = sequelize.define('TicketSetting', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ticketName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [0, 150]
      }
    },
    topField: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        len: [0, 150]
      }
    },
    availableDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    price: {
      // type: DataTypes.INTEGER,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: true,
        isDate: true
      }
    },
    limitPerOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: true,
      validate: {
        len: [0, 3]
      }
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    adminOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  TicketSetting.associate = models => {
    TicketSetting.belongsTo(models.TicketType);
    TicketSetting.belongsTo(models.Event);
  };

  return TicketSetting;
};
