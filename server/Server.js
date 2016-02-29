var flash = require('connect-flash');
var express = require('express');
var app = express();
var session = require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false });
var passport = require('./libs/passport');
var bodyParser = require('body-parser').urlencoded({ extended: true });
var morgan = require('morgan')('combined');
var cookie = require('cookie-parser')();

app.use(flash());
app.use(morgan);
app.use(cookie);
app.use(bodyParser);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

require('./routes')(app, passport);

var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket, username){
  console.log('User connected');
  socket.on('username', function(username){
    socket.username = username;
  });
  socket.on('msgst', function(msg){
    io.emit('msgrcv', socket.username + ':' + msg);
  });
});

server.listen(8080, function(){
  console.log('Listening on port 8080');
});
