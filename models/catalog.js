"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey: "catalogId",
        // as:"catalogs"
      });

      this.belongsTo(models.User, {
        foreignKey: "userId",
        // as:"user"
        // targetKey:"userId"
      });
    }
  }
  Catalog.init(
    {
      name: DataTypes.STRING,
      products: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Catalog",
    }
  );

  return Catalog;
};
