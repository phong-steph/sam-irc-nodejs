var User = require('./models/user');
var io = require('socket.io');

module.exports = function(app, passport){

  io = io.listen(app.server);

  app.get('/', function(req, res){
    res.render('login');
  });

  app.get('/login',
    function(req, res){
      res.render('login');
  });

  app.get('/logout',
      function(req, res){
        req.logout();
        req.flash('flash', 'Vous avez été déconnecté.');
        res.redirect('/login');
    });

  app.get('/register',
    function(req, res){
      res.render('register');
    });

  app.post('/login',
    passport.authenticate('local', {failureRedirect: 'login',}),
    function(req, res){
      console.log("FICHTRE");
      res.redirect('/chat');
      // res.render('chat');
    });

    app.get('/chat',
      function(req, res){
        res.render('chat');
    });


  app.post('/register',
    function(req, res){
      User.findByUsername(req.body.username).then(function(user){
        if (!user){
          User.register(req.body.username, req.body.password);
          res.redirect('/login');
        }
        else{
          res.redirect('/register');
        }
      });
    });

  //   io.sockets.on('connection', function (socket, pseudo) {
  //   // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
  //   socket.on('nouveau_client', function(pseudo) {
  //       pseudo = ent.encode(pseudo);
  //       socket.pseudo = pseudo;
  //       socket.broadcast.emit('nouveau_client', pseudo);
  //   });
  //
  //   // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
  //   socket.on('message', function (message) {
  //       message = ent.encode(message);
  //       socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
  //   });
  // });
};
