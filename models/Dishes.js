const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
});

module.exports = User = mongoose.model("dishes", DishSchema);
