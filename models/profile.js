'use strict';

const{ Model }= require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      Profile.belongsTo(User, {
        onDelete: 'cascade', 
        hooks: true
      })
      // define association here
    }
  };
  Profile.init({
   
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picurl: {
      type: DataTypes.STRING
    },
    shippingid: {
      type: DataTypes.INTEGER
    },
    loveauthor: {
      type: DataTypes.JSON
    },
    tagsb: {
      type: DataTypes.JSON
    }


  }, {   
    sequelize,
    tableName: 'profile',
     modelName: 'Profile',
    freezeTableName: true,
   

   });
   
  return Profile;
};
