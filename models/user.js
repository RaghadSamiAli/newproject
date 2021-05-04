'use strict';

const{ Model }= require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config()


//const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Bookreq, Profile, Notification ,Item}) {

      this.hasOne(Profile, {
        foreignKey: 'userid'
      });
      
      this.hasMany(Order, {
        foreignKey: 'userid'
      });
      this.hasMany(Item, {
        foreignKey: 'userid'
      });
      this.hasOne(Notification, {
        foreignKey: 'userid'
      });
      
      this.hasMany(Bookreq, {
        foreignKey: 'userid'
      });
      
      // define association here
    }
  };
  User.init({
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    fname: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false

    },
    lname: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.fname} ${this.lname}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    }, role: {
      type: DataTypes.INTEGER,
      defaultValue: "1"
    }
  }, {   
    sequelize,
    tableName: 'users',
     modelName: 'User',
    freezeTableName: true,
    hooks: {
  //    beforeCreate: (user) => {
    //    console.log(process.env.PASSHASH)
//return bcrypt.hash(user.password, 10)
       //   .then(hash => {
         //   user.password = hash;
            
//})
       //   .catch(err => {
      //      throw new Error();
        //  });
        
      
  //    },

    }

  });
  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { phone: login },
    });
    return user;
  };
    User.beforeCreate(async (user) => {
      if (user.password) {
        user.password = await user.generatePasswordHash();
      }
    });
  
    User.prototype.updatePasswordHash = async function (password) {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    };
  
    User.prototype.generatePasswordHash = async function () {
      const saltRounds = 10;
      return await bcrypt.hash(this.password, saltRounds);
    };
  
    User.prototype.validatePassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };
  return User;
};
