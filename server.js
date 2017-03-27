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

// Server routes
app.get('/', function(req, res, next) {
  res.send('Testing Server')
})

app.get('/goals', function(req, res, next) {
  Goal.find(function (error, goals) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      console.log(goals);
      res.send(goals);
    }
  });
});

app.post('/goals', function(req, res, next) {
  Goal.create(req.body, function(error, goal) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      console.log(goal);
      res.json(goal);
    }
  });
});

// Add a review
app.post('/goals/:id/reviews', function(req, res, next) {
  Goal.findById(req.params.id, function(err, foundGoal) {
    if (err) {
      console.error(err);
      return next(err);
    } else if (!foundGoal) {
      return res.send("Error! No beer found with that ID");
    } else {
      foundGoal.reviews.push(req.body)
      foundGoal.save(function(err, updatedGoal) {
        if (err) {
          return next(err);
        } else {
          res.send(updatedGoal);
        }
      });
    }
  });
});

// DELETE a goal
app.delete('/delete/:id', function(req, res, next) {
  Goal.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Goal Deleted");
    }
  });
});

app.put('/goals/:id/complete', function(req, res, next) {
  req.body.completed = true;
  Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, goal) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(goal);
    }
  });
});

app.put('/goals/:id', function(req, res, next) {
  // new means we want the updated object returned rather than the original one
  Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, goal) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(goal);
    }
  });
});

app.listen(8050, function() {
  console.log("Life goaling over here. Boot up 8050")
});