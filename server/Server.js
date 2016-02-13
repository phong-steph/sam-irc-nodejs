var http = require('http');
var fs = require('fs');
var Sequelize = require('sequelize');

var server = http.createServer(function(req, res) {
    fs.readFile('../client/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var sequelizeapi = new Sequelize('myirc', 'root', null, {
  dialect: 'mysql',
});

sequelizeapi.authenticate().then(function(errors){
  console.log(errors);
});

var User = sequelizeapi.define('User', {
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

User.findAll().then(function(user){
  console.log(user);
});

//sequelizeobj.query('SELECT * FROM users').then(function(users) {
//  console.log(users)
//});

io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  //socket.emit('message', 'Connected!');
  //socket.broadcast.emit('message', 'un autre client vient de se co');
  socket.on('message', function(message){
    console.log('Client talk to me: ' + message);
  });
});

server.listen(8080);
