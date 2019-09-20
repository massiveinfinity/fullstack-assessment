module.exports = (sequelize, DataTypes) => {
  const grocery = sequelize.define('grocery', {
    groceryId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    barcode: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  grocery.associate = function (models) {
    // associations can be defined here
  };
  return grocery;
};
