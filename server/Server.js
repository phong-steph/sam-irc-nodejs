
var path = require('path');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var session = require('express-session');
var passport = require('./libs/passport');
var bodyParser = require('body-parser');

app.use(flash());
app.use(session({
  secret: 'woot',
}));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  res.render('login');
});

// app.post('/login', function(req, res, next){
//   console.log('LOGIN');
//   passport.authenticate('local', function(err, user, info) {
//       console.log('authenticate callback');
//       if (err) { return res.send({'status':'err','message':err.message}); }
//       if (!user) { return res.send({'status':'fail','message':info.message}); }
//       req.logIn(user, function(err) {
//         if (err) { return res.send({'status':'err','message':err.message}); }
//         return res.send({'status':'ok'});
//       });
//     })(req, res, next);
//   },
//   function(err, req, res, next) {
//     // failure in login test route
//   return res.send({'status':'err','messages':err.message});
// });


app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );


// io = require('socket.io').listen(server);
//
// io.sockets.on('connection', function (socket) {
//   socket.emit('message', 'Connected!');
//   socket.broadcast.emit('message', 'un autre client vient de se co');
//   socket.on('message', function(message){
//     console.log('Client talk to me: ' + message);
//   });
// });

// server.listen(8080);
app.listen(8080);
