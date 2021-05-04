'use strict';

const{ Model }= require('sequelize');




module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Item,Shippingadd}) {
      Order.belongsTo(User, {
        foreignKey: 'userid'
      });
      this.hasMany(Item, {
        foreignKey: 'orderid'
      });
      this.belongsTo(Shippingadd, {
        foreignKey: 'shippingid'
      })
      // define association here
    }
  };
  Order.init({
    orderid: {
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
    booksispn: {
      type: DataTypes.JSON,
      allowNull: false
    },
    shippingid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:"0"
    },productscosts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:"0"
    },
    shippingcost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      set(value) {
        const count =  db.Shippingadd.findByPk(this.shippingid); 
         this.setDataValue(count.price);
    }
    },
    totalprice: {
      type: DataTypes.INTEGER,
   
      set(value) {
        this.productscosts+$this.shippingcost
      }
    }
  
  }, {   
    sequelize,
    tableName: 'orders',
     modelName: 'Order',
    freezeTableName: true,
   

   });
   
  return Order;
};
