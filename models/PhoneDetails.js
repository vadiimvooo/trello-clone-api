// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  PhoneDetails.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    namespaceId: DataTypes.STRING,
    capacityAvailable: DataTypes.ARRAY(DataTypes.STRING),
    capacity: DataTypes.STRING,
    priceRegular: DataTypes.INTEGER,
    priceDiscount: DataTypes.INTEGER,
    colorsAvailable: DataTypes.ARRAY(DataTypes.STRING),
    color: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.JSONB,
    screen: DataTypes.STRING,
    resolution: DataTypes.STRING,
    processor: DataTypes.STRING,
    ram: DataTypes.STRING,
    camera: DataTypes.STRING,
    zoom: DataTypes.STRING,
    cell: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'PhoneDetails',
    createdAt: true,
    updatedAt: false,
  });
  return PhoneDetails;
};