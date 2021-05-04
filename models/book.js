'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Author,Category,Item}) {
      Book.belongsTo(Category, {
        foreignKey: 'categoryid'
      });
      
      Book.belongsTo(Author, {
        foreignKey: 'authorid'
      });
      this.hasMany(Item, {
        foreignKey: 'isbn'
      })
      
      // define association here
    }
  };
  Book.init({
    isbn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publishedate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "5021-04-19"
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0"
    },
    picurl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discribtion: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },localprice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tag: {
      type: DataTypes.JSON
    },
    buycount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    viewcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1"
    }
  }, {   
    sequelize,
    tableName: 'books',
     modelName: 'Book',
    freezeTableName: true,
   

   });
   
  return Book;
};
