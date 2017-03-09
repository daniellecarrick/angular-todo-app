app.factory('goalsFactory', function($http){
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

  return {
    goals: goals,
    completed: completed
  };
});