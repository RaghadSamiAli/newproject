'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Shippingadd extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
  this.hasMany(Order,{
    foreignKey: 'shippingid'
  });
      // define association here
    }
  };
  Shippingadd.init({
   
    shippingid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lag: {
      type: DataTypes.STRING
    },
    lat:{
      type:DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    }


  }, {   
    sequelize,
    tableName: 'shippinhadds',
     modelName: 'Shippingadd',
    freezeTableName: true,
   

   });
   
  return Shippingadd;
};
