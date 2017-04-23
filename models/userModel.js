var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  socialId: String,
  provider: String,
  email: String,
  loginCount: Number
});

UserSchema.plugin(plm);

var User = mongoose.model("User", UserSchema);

module.exports = User;