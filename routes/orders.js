const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { razorKeyId, razorKeySecret } = require("../config/keys");
const Dish = require("../models/Dishes");
const Order = require("../models/Orders");
const { isUser } = require("../utils/auth");
const { validateOrderCreate } = require("../utils/validation/ord_val");

const instance = new Razorpay({
  key_id: razorKeyId,
  key_secret: razorKeySecret,
});

// @route   POST api/orders/create
// @desc    Create an order
// @access  Private
router.post("/create", isUser, async (req, res) => {
  const { errors, isValid } = validateOrderCreate(req.body);
  if (!isValid) return res.status(400).json(errors);
  try {
    const orderedDishes = await Dish.find(
      {
        _id: { $in: req.body.map((doc) => doc.id) },
      },
      "price name"
    );
    let total = 0;
    const cart = req.body
      .filter((item) => item.quantity >= 1)
      .map((item) => {
        dish = orderedDishes.find((od) => od._id == item.id);
        const totalPrice = dish.price * item.quantity;
        total = total + totalPrice;
        return {
          fid: dish._id,
          name: dish.name,
          price: dish.price,
          quantity: item.quantity,
          totalPrice: totalPrice,
        };
      });
    const options = {
      amount: total * 100,
      currency: "INR",
    };
    let bill = await instance.orders.create(options);
    bill = {
      ...bill,
      order_id: bill.id,
      key: instance.key_id,
      name: "GrillHub",
      desc: "Feast!!",
    };
    const order = new Order({
      oid: bill.id,
      cid: req.user.id,
      cart: cart,
      total: total,
      paid: false,
    });
    // await order.save();
    return res.json(bill);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occured during order creation" });
  }
});

module.exports = router;
