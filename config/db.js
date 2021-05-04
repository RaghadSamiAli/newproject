
const { Sequelize } = require('sequelize');
const path = require('path');
const express = require('express');

module.exports =  new Sequelize(process.env.SQLDB, process.env.SQLUSER, process.env.SQLPASS, {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
