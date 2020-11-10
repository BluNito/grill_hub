const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
  clearance: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
