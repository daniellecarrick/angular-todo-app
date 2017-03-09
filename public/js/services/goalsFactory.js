app.factory('goalsFactory', function($http, $log){

  var goals = [
  {
    goal: "Hike the PCT",
    type: "travel",
    description: "Cheryl strayed is BAE",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Start my own business",
    type: "career",
    description: "Time to put the business degree to use",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Plant a garden",
    type: "project",
    description: "Plants are dope",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Live abroad",
    type: "travel",
    description: "For ze experience",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Go skydiving",
    type: "experience",
    description: "No time for fear",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Adopt a dog",
    type: "project",
    description: "Dogs are hella cute",
    image: "http://lorempixel.com/400/300/cats/"
  }
  ];

  var completed = [
  {
    goal: "Being born",
    type: "personal",
    description: "A tough day but a good day #thanksmom",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Run a marathon",
    type: "personal",
    description: "The more you run, the more you can eat",
    image: "http://lorempixel.com/400/300/cats/"
  },
  {
    goal: "Go to Israel",
    type: "travel",
    description: "living my best life",
    image: "http://lorempixel.com/400/300/cats/"
  }
  ];
  var goalText = "";
  var typeText = "";
  var descriptionText = "";

  var addGoal = function(goalText, typeText, descriptionText) {
    goals.push({goal: goalText, type: typeText, description: descriptionText});
    $log.log("added a goal");
    $log.log(goalText);
  }

  var moveToCompleted = function(goal) {
    completed.push(goal);
    var index = goals.indexOf(goal);
    goals.splice(index, 1);
    console.log("fact was clicked");
  }

  var deleteGoal = function(goal) {
    /*To do: add an are you sure*/
    var index = goals.indexOf(goal);
    goals.splice(index, 1);
    console.log(goals);
  }

  var changeCompletedGoals = function () {
    showActiveGoals = true;
    showCompletedGoals = true;
    $log.log(showActiveGoals)
  }

  var changeActiveGoals = function () {
    showActiveGoals = false;
    showCompletedGoals = false;
    $log.log(showActiveGoals)
  }

  return {
    goals: goals,
    completed: completed,
    moveToCompleted: moveToCompleted,
    deleteGoal: deleteGoal,
    changeActiveGoals: changeActiveGoals,
    changeCompletedGoals: changeCompletedGoals,
    addGoal: addGoal
  };
});