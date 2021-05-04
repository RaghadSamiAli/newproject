'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books}) {
  
      // define association here
    }
  };
  Language.init({
   

    langid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },  dir: {
      type: DataTypes.ENUM('rtl', 'ltr') ,
      allowNull: false
    }

  }, {   
    sequelize,
    tableName: 'languages',
     modelName: 'Language',
    freezeTableName: true,
   

   });
   
  return Language;
};
