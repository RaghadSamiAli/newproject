'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Coupone extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
  
      // define association here
    }
  };
  Coupone.init({
   
    couponeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    promocode: {
      type: DataTypes.STRING,
      unique: true
    },
    type: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {   
    sequelize,
    tableName: 'coupones',
     modelName: 'Coupone',
    freezeTableName: true,
   

   });
   
  return Coupone;
};
