var db = require('../libs/sequelize');
var Sequelize = require('sequelize');

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  }
}, {
  freezeTableName: true,
});

var Message = db.define('Message', {
  message: {
    type: Sequelize.TEXT,
    field: 'Message'
  },
  idUser: {
    type: Sequelize.INTEGER,
    field: 'idUser'
  }

}, {
  freezeTableName: true,
});

module.exports = User;
