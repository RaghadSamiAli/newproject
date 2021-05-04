'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books}) {
  
      // define association here
    }
  };
  Faq.init({
    faqid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },answer: {
      type: DataTypes.STRING,
      allowNull: false
    },


  }, {   
    sequelize,
    tableName: 'faqs',
     modelName: 'Faq',
    freezeTableName: true,
   

   });
   
  return Faq;
};
