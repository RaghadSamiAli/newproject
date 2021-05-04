'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Featuredbook extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books}) {
  
      // define association here
    }
  };
  Featuredbook.init({
   
    isbns: {
      type: DataTypes.JSON
    }

  }, {   
    sequelize,
    tableName: 'featuredbooks',
     modelName: 'Featuredbook',
    freezeTableName: true,
   

   });
   
  return Featuredbook;
};
