var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var reviewSchema = new Schema({
  name: String,
  text: String
});*/

var goalSchema = new Schema({
  name: String,
  type: String,
  description: String,
  completed: { type: Boolean, default: false},
  date_start: { type: Date, default: date.now},
  date_completed: { type: Date, default: date.now}
});

var Goal = mongoose.model("goal", goalSchema); //collection name
module.exports = Goal;