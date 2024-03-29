/**
 * Bars model
 * @author DinhNguyen
 */
module.exports = function (sequelize, DataTypes) {
  var Bars = sequelize.define('Bars', {
    id: {
      type: DataTypes.STRING(50),
      // autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100)
    },
  }, {
    timestamps: false
  });

  Bars.associate = models => {
    Bars.belongsTo(models.Foos);
  };

  return Bars;
};
