var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
  name: String,
  type: String,
  description: String,
  completed: { type: Boolean, default: false}
});

var Goal = mongoose.model("goal", goalSchema); //collection name
module.exports = Goal;