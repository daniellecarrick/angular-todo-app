var express = require('express');
var router = express.Router();
var Goal = require("../models/GoalModel");

// Server routes
/*router.get('/', function(req, res, next) {
  res.send('Testing Server')
})*/

router.get('/', function(req, res, next) {
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

router.post('/', function(req, res, next) {
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

/*
// Add a review / dont need this. no reviews.
router.post('/:id/reviews', function(req, res, next) {
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
});*/

// DELETE a goal
router.delete('/delete/:id', function(req, res, next) {
  Goal.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.send("Goal Deleted");
    }
  });
});

// route for completing goals
router.put('/:id/complete', function(req, res, next) {
  req.body.completed = true;
  req.body.date_completed = new Date();
  Goal.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, goal) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(goal);
    }
  });
});

router.put('/:id', function(req, res, next) {
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

module.exports = router;