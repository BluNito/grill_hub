const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  oid: {
    type: String,
    required: true,
  },
  cid: {
    type: String,
    required: true,
  },
  cart: {
    type: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = User = mongoose.model("orders", OrderSchema);
