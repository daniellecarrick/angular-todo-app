var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goalSchema = new Schema({
  name: String,
  type: String,
  description: String
});

var Goal = mongoose.model("goal", goalSchema); //collection name
module.exports = Goal;