const { sequelize, DataTypes } = require('sequelize');

/**
 * Event model
 * @author KimThi
 */
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    taglines: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventPageUrl: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 100]
      }
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    headerBackground: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
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
    timeZone: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    timeZoneDisplay: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    venueName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    websiteUrl: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    venueNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    },
    venueAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    venueLatLng: {
      type: DataTypes.STRING(40),
      allowNull: true,
      validate: {
        len: [0, 40]
      }
    },
    contactName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [0, 20]
      }
    },
    venueIntroduction: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    venueReservation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    conversationName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: [0, 100]
      }
    },
    sendEmailNewOrder: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sendEmailNewMsg: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    prefix: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        len: [0, 10]
      }
    },
    ticketPrefix: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        len: [0, 10]
      }
    }
  });

  Event.associate = models => {
    Event.hasMany(models.TicketSetting, { as: 'ticketSettings' });
    Event.hasMany(models.Order, { as: 'orders' });
    Event.hasMany(models.TicketType);
  };

  return Event;
};
