/**
 * Order model
 * @author KimThi
 */
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      validate: {
        len: {
          args: [0, 50],
          msg: 'Length of order No should be maximum of 50 characters'
        }
      }
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        len: [0, 5]
      }
    },
    promoCode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM,
      values: ['placed', 'completed', 'cancelled', 'failed'],
      defaultValue: 'placed',
      validate: {
        isIn: [['placed', 'completed', 'cancelled', 'failed']]
      }
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'cash',
      validate: {
        len: [0, 50]
      }
    },
    receiveNo: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    telrOrderRef: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    chargeFee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    notes: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: {
          args: [0, 200],
          msg: 'Length of notes should be maximum of 200 characters'
        }
      }
    },
    orderNo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: {
          args: [0, 30],
          msg: 'Length of order No should be maximum of 30 characters'
        }
      },
      defaultValue: 1
    },
    invoiceNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      //autoIncrement: true,
      allowNull: false,
      defaultValue: 0
    },
    productTotalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    taxPercent: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    orderInvoiceUrl: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    orderReceiptUrl: {
      type: DataTypes.STRING(200),
      allowNull: true,
      validate: {
        len: [0, 200]
      }
    },
    paymentLink: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyerInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paymentBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
  });

  Order.associate = models => {
    Order.belongsTo(models.Event);
  };

  return Order;
};
