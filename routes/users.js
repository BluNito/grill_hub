const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const { encryptKey } = require("../config/keys");
const User = require("../models/Users");
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
} = require("../utils/validation/user_val");

const extractUserDetails = (user, token) => {
  return {
    token: `Bearer ${token}`,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    contact: user.contact,
    address: user.address,
    avatar: user.avatar,
    confirmed: user.confirmed,
    clearance: user.clearance,
  };
};
const createPayload = (user) => {
  return {
    id: user._id,
    clearance: user.clearance,
  };
};

// @route   POST api/user/register
// @desc    Register a user
// @access  public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateUserRegistration(req.body);
  if (!isValid) return res.status(400).json(errors);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ register: "Email taken" });
    const avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      password: password,
      avatar: avatar,
      confirmed: false,
      clearance: 1,
    });
    const savedUser = await newUser.save();
    const payload = createPayload(savedUser);
    const token = await jwt.sign(payload, encryptKey, { expiresIn: "7d" });
    const cleanedUser = extractUserDetails(savedUser, token);
    return res.json(cleanedUser);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An unknown error occurred during registration" });
  }
});

// @route   POST api/user/register
// @desc    Register a user
// @access  public
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateUserLogin(req.body);
  if (!isValid) return res.status(400).json(errors);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ login: "User not found" });
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ login: "Incorrect password" });
    const payload = createPayload(user);
    const token = await jwt.sign(payload, encryptKey, { expiresIn: "7d" });
    const cleanedUser = extractUserDetails(user, token);
    return res.json(cleanedUser);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "An unknown error has occurred during login" });
  }
});

// @route   PATCH api/users/update
// @desc    Update user info
// @access  private
router.patch("/update", auth.isUser, async (req, res) => {
  const { errors, isValid } = validateUserUpdate(req.body);
  if (!isValid) return res.json(errors);
  const updateFields = {};
  try {
    if (req.body.fname) updateFields.fname = req.body.fname;
    if (req.body.lname) updateFields.lname = req.body.lname;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.contact) updateFields.contact = req.body.contact;
    if (req.body.address) updateFields.address = req.body.address;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updateFields.password = password;
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    );
    const cleanedUser = extractUserDetails(user, req.headers.authorization);
    return res.json(cleanedUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "An unknown error ocurred during user information update",
    });
  }
});

module.exports = router;
