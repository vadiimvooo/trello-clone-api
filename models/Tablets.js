// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tablets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/*models*/) {
      // define association here
    }
  }
  Tablets.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    category: DataTypes.STRING,
    phoneId: DataTypes.STRING,
    itemId: DataTypes.STRING,
    name: DataTypes.STRING,
    fullPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    screen: DataTypes.STRING,
    capacity: DataTypes.STRING,
    color: DataTypes.STRING,
    ram: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Tablets',
    createdAt: true,
    updatedAt: false,
  });
  return Tablets;
};