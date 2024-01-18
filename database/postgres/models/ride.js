'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ride extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ride.init({
    latitudeInit: DataTypes.FLOAT,
    longitudeInit: DataTypes.FLOAT,
    latitudeFinish: DataTypes.FLOAT,
    longitudeFinish: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ride',
    tableName: 'ride',
    timestamps: false
  });
  return ride;
};