const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  cid: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        fid: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  inCart: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model("carts", CartSchema);
