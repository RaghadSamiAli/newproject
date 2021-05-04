'use strict';

const{ Model }= require('sequelize');
import db from './';


module.exports = (sequelize, DataTypes) => {
  class Bookreq extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
  this.belongsTo(User, {
    foreignKey: 'userid'
  });
      // define association here
    }
  };
  Bookreq.init({
   
      bookreqid: {
        type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
        allowNull: false,
        unique: true
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      booktitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bookauther: {
        type: DataTypes.STRING
      }
  }, {   
    sequelize,
    tableName: 'bookreqs',
     modelName: 'Bookreq',
    freezeTableName: true,
   

   });
   Bookreq.prototype.Edit = async function (input) {

    const bookreqid = input.bookreqid;
   
    const updatebookreq = await Bookreq.update({...input}, {where: { bookreqid }});
    const bookreq = await Bookreq.findByPk(bookreqid,{include: [{
      model: db.User 
  }]});

if (updatebookreq == 0 ){
  throw new Error('Cannot update|| Somethine went wrong');
}
if (updatebookreq == 1){
  console.log(bookreq , bookreq.User)
  return bookreq
}
  
  };
  
  return Bookreq;
};
