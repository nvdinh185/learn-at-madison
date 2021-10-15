/**
 * Foos model
 * @author DinhNguyen
 */
module.exports = (sequelize, DataTypes) => {
  var Foos = sequelize.define('Foos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name1: {
      type: DataTypes.STRING(100)
    },
    name2: {
      type: DataTypes.STRING(100)
    },
    name3: {
      type: DataTypes.STRING(100)
    },
  }, {
    timestamps: false
  });

  Foos.associate = models => {
    Foos.hasOne(models.Bars);
  };

  return Foos;
};
