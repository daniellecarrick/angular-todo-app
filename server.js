var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Goal = require("./models/GoalModel");
mongoose.connect("mongodb://localhost/goalsdb"); //database name

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

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

/*app.post('/goals', function (req, res, next) {
  res.send('POST!');
});*/

app.post('/goals', function(req, res, next) {
  Goal.create(req.body, function(error, goal) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.json(goal);
    }
  });
});

app.delete('/goals/:id', function(req, res, next) {
  Goal.remove({ _id: req.param.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Goal Deleted");
    }
  });
});

app.listen(8000, function() {
  console.log("Life goaling over here")
});