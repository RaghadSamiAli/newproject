'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book}) {
    this.hasMany(Book, {
       
        foreignKey: 'categoryid' ,
  
      })
      // define association here
    }
  };
  Category.init({
   
    categoryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bannerpic: {
      type: DataTypes.STRING
    }


  }, {   
    sequelize,
    tableName: 'categorys',
     modelName: 'Category',
    freezeTableName: true,
   

   });
   
  return Category;
};
