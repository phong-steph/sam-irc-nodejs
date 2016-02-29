var User = require('./models/user');

module.exports = function(app, passport){

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

    app.get('/chat',
      function(req, res){
        if (req.user){
          res.render('chat', {username: req.user.username});
        }
        else
          res.render('login');
    });

  app.post('/login',
    passport.authenticate('local', {failureRedirect: 'login',}),
    function(req, res){
      res.redirect('/chat');
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

};
