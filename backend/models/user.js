const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type:String, unique:true},
  phoneNumber: {type:Number, unique:true},
  address: String,
  pwd: String,
  role:String,
  avatar:String,
});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

const user = mongoose.model("User", userSchema);
module.exports = user;
