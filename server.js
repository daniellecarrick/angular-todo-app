var express = require('express');

var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var goalRoutes = require('./routes/goalRoutes');
var userRoutes = require('./routes/userRoutes');
var authRoutes = require('./routes/authRoutes');
var User = require("./models/UserModel");

// database name
mongoose.connect("mongodb://localhost/goalsdb");

var app = express();
// Tells the program where to find the files
app.use(express.static('public'));
app.use(express.static('node_modules'));
// converts teh request obhect into a friendlier format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



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

//This tells the server that when a request comes into '/goals'
//that it should use the routes in 'goalRoutes'
//and those are in our new goalRoutes.js file
app.use('/goals', goalRoutes);
// this means that in the userRoutes file, the program knows to start looking in the users folder
app.use('/users', userRoutes);
// need this for the auth routes
app.use('/auth', authRoutes);

app.all('*', function(req, res) {
 res.sendFile(__dirname + '/public/index.html')
});

//error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.send( {
   message: err.message,
   error: err
 });
});
app.listen(8000, function() {
  console.log("Life goaling over here. Boot up 8000")
});