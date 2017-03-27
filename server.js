var express = require('express');
var app = express();
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var Goal = require("./models/GoalModel");
var User = require("./models/UserModel");

// database name
mongoose.connect("mongodb://localhost/goalsdb");

// converts teh request obhect into a friendlier format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tells the program where to find the files
app.use(express.static('public'));
app.use(express.static('node_modules'));

// For user authentication
app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy()); //Thanks to m-l-p there is no need to create a local strategy
passport.serializeUser(User.serializeUser()); //also it helps here
passport.deserializeUser(User.deserializeUser()); //and here

app.listen(8050, function() {
  console.log("Life goaling over here. Boot up 8050")
});