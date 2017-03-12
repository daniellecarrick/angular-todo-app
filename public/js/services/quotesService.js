app.service('quotesService', function($http, $log) {

  var quotes = [
  "It does not matter how slowly you go as long as you do not stop",
  "Life has two rules: #1 Never quit #2 Always remember rule # 1.",
  "The biggest failure you can have in life is making the mistake of never trying at all.",
  "Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending",
  "Nobody ever wrote down a plan to be broke, fat, lazy, or stupid. Those things are what happen when you don’t have a plan",
  "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible."
  ];

  // generates a random index for the quotes array
  var index = Math.round(Math.random() * (quotes.length - 1))

  return {
    quotes: quotes,
    index: index
  }

})