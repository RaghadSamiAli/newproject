'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order,Book,User}) {
      Item.belongsTo(Order, {
        foreignKey: 'orderid'
      });
      
      Item.belongsTo(Book, {
        foreignKey: 'bookid'
      });
      Item.belongsTo(User, {
        foreignKey: 'userid'
      });
      // define association here
    }
  };
  Item.init({
    itemid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    orderid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },userid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },title: {
      type: DataTypes.STRING,
    },
    picurl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },status:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: "1"
    }
  }, {   
    sequelize,
    tableName: 'items',
     modelName: 'Item',
    freezeTableName: true,
   

   });
   
  return Item;
};
