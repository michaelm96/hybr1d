'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Catalog,{
        foreignKey:"userId"
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options) => {
    user.password = bcrypt.hashSync(user.password, saltRounds);
  })

  return User;
};