
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

app.listen(8080);
