const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { razorKeyId, razorKeySecret, razorSecret } = require("../config/keys");
const Dish = require("../models/Dishes");
const Order = require("../models/Orders");
const Cart = require("../models/Carts");
const { isUser } = require("../utils/auth");
const { forceToInteger } = require("../utils/forcers");
const { validateCartAdd } = require("../utils/validation/ord_val");
const { extractCartDetails } = require("../utils/extractors");

const instance = new Razorpay({
  key_id: razorKeyId,
  key_secret: razorKeySecret,
});

const getCart = async (id) => {
  let cart = await Cart.findOne({ cid: id });
  if (!cart) {
    cart = new Cart({
      cid: id,
      cart: [],
      inCart: 0,
    });
    cart = await cart.save();
  }
  return cart;
};

const getCartInfo = async (id) => {
  const cart = await getCart(id);
  const foodids = cart.cart.map((item) => item.fid);
  let dishes = await Dish.find({ _id: { $in: foodids } });
  dishes.sort((a, b) => a.id < b.id);
  let total = 0;
  const cartItems = cart.cart.map((_, index) => {
    total = total + dishes[index].price * cart.cart[index].quantity;
    return {
      id: dishes[index]._id,
      name: dishes[index].name,
      price: dishes[index].price,
      quantity: cart.cart[index].quantity,
      totalPrice: dishes[index].price * cart.cart[index].quantity,
    };
  });
  return {
    cartItems,
    total,
  };
};

// @route   GET api/orders/cart
// @desc    Get cart
// @access  Private
router.get("/cart", isUser, async (req, res) => {
  try {
    let cart = await getCart(req.user.id);
    cleanedCart = extractCartDetails(cart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during adding to cart" });
  }
});

// @route   GET api/orders/cartitems
// @desc    Get cart items
// @access  Private
router.get("/cartitems", isUser, async (req, res) => {
  try {
    const cartItems = await getCartInfo(req.user.id);
    return res.json(cartItems);
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
      else {
        newList.push({
          fid: req.body.id,
          quantity: req.body.quantity,
        });
        newList.sort((a, b) => a.fid < b.fid);
      }
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
    cleanedCart = extractCartDetails(savedCart);
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
    if (!cart) return res.status(400).json({ cart: "Cart does not exist" });
    cart.cart = cart.cart.filter(
      (item) => !req.body.includes(item.fid.toString())
    );
    cart.inCart = 0;
    cart.cart.forEach((item) => {
      cart.inCart = cart.inCart + item.quantity;
    });
    const savedCart = await cart.save();
    cleanedCart = extractCartDetails(savedCart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during adding to cart" });
  }
});

// @route   DELETE api/orders/dropcart
// @desc    Add items to the cart
// @access  Private
router.delete("/dropcart", isUser, async (req, res) => {
  try {
    let cart = await Cart.findOne({ cid: req.user.id });
    if (!cart) return res.status(400).json({ cart: "Cart does not exist" });
    cart.cart = [];
    cart.inCart = 0;
    const savedCart = await cart.save();
    cleanedCart = extractCartDetails(savedCart);
    return res.json(cleanedCart);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occurred during cart deletion" });
  }
});

// @route   POST api/orders/create
// @desc    Create an order
// @access  Private
router.post("/create", isUser, async (req, res) => {
  try {
    const cartInfo = await getCartInfo(req.user.id);
    if (cartInfo.total < 1)
      return res.status(400).json({ cart: "Add more items to cart" });
    const options = {
      amount: cartInfo.total * 100,
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
      cart: cartInfo.cartItems,
      total: cartInfo.total,
      paid: false,
    });
    await order.save();
    return res.json(bill);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occured during order creation" });
  }
});

// @route   POST api/orders/complete
// @desc    Complete an order
// @access  Public
router.post("/complete", async (req, res) => {
  console.log("pinged");
  if (req.body.event !== "payment.authorized")
    return res.json({ status: false });
  try {
    Razorpay.validateWebhookSignature(
      req.body,
      req.headers["x-razorpay-signature"],
      razorSecret
    );
    const orderId = req.body.payload.payment.entity.order_id;
    await Order.findOneAndUpdate(
      { oid: orderId },
      { paid: true },
      { new: true }
    );
    return res.json({ status: true });
  } catch (e) {
    console.log(e);
    return res.status(203).json({ error: "Invalid signatures passed" });
  }
});

module.exports = router;
