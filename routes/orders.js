const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { razorKeyId, razorKeySecret } = require("../config/keys");
const Dish = require("../models/Dishes");
const Order = require("../models/Orders");
const Cart = require("../models/Carts");
const { isUser } = require("../utils/auth");
const { forceToInteger } = require("../utils/forcers");
const {
  validateOrderCreate,
  validateCartAdd,
} = require("../utils/validation/ord_val");

const extractCartInfo = (cart) => {
  const cleanedCart = {};
  cleanedCart.inCart = cart.inCart;
  cleanedCart.cart = cart.cart.map((item) => {
    return {
      id: item.fid,
      quantity: item.quantity,
    };
  });
  return cleanedCart;
};

const instance = new Razorpay({
  key_id: razorKeyId,
  key_secret: razorKeySecret,
});

// @route   GET api/orders/cart
// @desc    Get cart
// @access  Private
router.get("/cart", isUser, async (req, res) => {
  try {
    let cart = await Cart.findOne({ cid: req.user.id });
    if (!cart) {
      cart = new Cart({
        cid: req.user.id,
        cart: [],
        inCart: 0,
      });
      cart = await cart.save();
    }
    cleanedCart = extractCartInfo(cart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during adding to cart" });
  }
});

// @route   POST api/orders/addtocart
// @desc    Add items to the cart
// @access  Private
router.post("/addtocart", isUser, async (req, res) => {
  const { errors, isValid } = validateCartAdd(req.body);
  req.body.quantity = forceToInteger(req.body.quantity);
  if (!isValid) return res.status(400).json(errors);
  try {
    const cart = await Cart.findOne({ cid: req.user.id });
    let savedCart;
    if (cart) {
      let newList = [...cart.cart];
      const index = newList.findIndex((element) =>
        element.fid.equals(req.body.id)
      );
      if (index > -1)
        newList[index].quantity = newList[index].quantity + req.body.quantity;
      else
        newList.push({
          fid: req.body.id,
          quantity: req.body.quantity,
        });
      cart.cart = newList;
      cart.inCart = cart.inCart + req.body.quantity;
      savedCart = await cart.save();
    } else {
      newCart = new Cart({
        cid: req.user.id,
        cart: [
          {
            fid: req.body.id,
            quantity: req.body.quantity,
          },
        ],
        inCart: req.body.quantity,
      });
      savedCart = await newCart.save();
    }
    cleanedCart = extractCartInfo(savedCart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during adding to cart" });
  }
});

// @route   PATCH api/orders/removefromcart
// @desc    Add items to the cart
// @access  Private
router.patch("/removefromcart", isUser, async (req, res) => {
  try {
    let cart = await Cart.findOne({ cid: req.user.id });
    if (req.body.id) {
      cart.inCart =
        cart.inCart -
        cart.cart.find((item) => item.fid.equals(req.body.id)).quantity;
      cart.cart = cart.cart.filter((item) => !item.fid.equals(req.body.id));
    } else {
      cart.inCart = 0;
      cart.cart = [];
    }
    const savedCart = await cart.save();
    cleanedCart = extractCartInfo(savedCart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during adding to cart" });
  }
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
