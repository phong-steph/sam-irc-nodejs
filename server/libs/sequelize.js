var Sequelize = require('sequelize');

var db = new Sequelize('myirc', 'root', null, {
  dialect: 'mysql',
});

module.exports = db;
