var db = require('../libs/sequelize');
var Sequelize = require('sequelize');

var User = db.define('user', {
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

User.findByUsername = function(username){
  return User.find({
    where : {username : username},
  });
};

User.findById = function(id){
  return User.find({
    where : {id : id},
  });
};

User.register = function(username, password){
  User.create({username : username, password : password});
};

module.exports = User;
