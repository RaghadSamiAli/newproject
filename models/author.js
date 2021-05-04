'use strict';

const{ Model }= require('sequelize');
import db from "./";


module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book}) {
      Author.hasMany(Book, {
        foreignKey: 'authorid'
      });
      
      // define association here
    }
  };
  Author.init({
    authorid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    authorname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    about: {
      type: DataTypes.STRING
    },
    picurl: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    bookscount: {
      type: DataTypes.STRING,
   
    }
  }, {   
    sequelize,
    tableName: 'authors',
     modelName: 'Author',
    freezeTableName: true,
   

   });
   
  return Author;
};
