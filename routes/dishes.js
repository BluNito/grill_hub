const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isAdmin, isUser } = require("../utils/auth");
const Dish = require("../models/Dishes");
const Tags = require("../utils/tags.json");
const { uploadFile } = require("../utils/uploader");
const { validateDishEntry } = require("../utils/validation/dish_val");
const {
  convertToArray,
  convertStringToArray,
} = require("../utils/convert_to_array");

const extractDishDetails = (dish) => {
  return {
    id: dish._id,
    name: dish.name,
    price: dish.price,
    desc: dish.desc,
    cover: dish.cover,
    type: dish.type,
  };
};

const hasValidFile = (files) => {
  let checks = {};
  if (files.length == 0) return checks;
  if (files[0].mimetype.substring(0, 5) !== "image")
    checks.errorFile = "Only image files are allowed";
  else checks.validFile = true;
  return checks;
};

// @route   POST api/dishes/add
// @desc    Add a dish
// @access  Admin
router.post("/add", [isAdmin, multer().any()], async (req, res) => {
  req.body.type = convertToArray(req.body.type);
  console.log(req.body.type);
  const { errors, isValid } = validateDishEntry(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { errorFile, validFile } = hasValidFile(req.files);
  if (errorFile) return res.status(400).json({ cover: errorFile });
  try {
    const dish = await Dish.findOne({ name: req.body.name });
    if (dish)
      return res.status(400).json({ name: "Cannot use same name twice" });
    let url;
    if (validFile) url = await uploadFile(req.files[0]);
    const newDish = new Dish({
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      desc: req.body.desc,
      cover: url,
    });
    const savedDish = await newDish.save();
    const cleanedDish = extractDishDetails(savedDish);
    return res.json(cleanedDish);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occured during food entry" });
  }
});

// @route   PATCH api/dishes/update
// @desc    Update a dish
// @access  Admin
router.patch("/update", [isAdmin, multer().any()], async (req, res) => {
  req.body.type = convertToArray(req.body.type);
  const { errors, isValid } = validateDishEntry(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { errorFile, validFile } = hasValidFile(req.files);
  if (errorFile) return res.status(400).json({ cover: errorFile });
  const updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.price) updateFields.price = req.body.price;
  if (req.body.type) updateFields.type = req.body.type;
  if (req.body.desc) updateFields.desc = req.body.desc;
  try {
    const dish = await Dish.findOne({ name: req.body.name });
    if (dish && dish._id !== req.body.id)
      return res.status(400).json({ name: "Cannot use same name twice" });
    if (validFile) {
      const url = await uploadFile(req.files[0]);
      updateFields.cover = url;
    }
    const updatedDish = await Dish.findByIdAndUpdate(
      req.body.id,
      { $set: updateFields },
      { new: true }
    );
    const cleanedDish = extractDishDetails(updatedDish);
    return res.json(cleanedDish);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "An error has occured during updation" });
  }
});

// @route   DELETE api/dishes/delete
// @desc    Delete a dish
// @access  Admin
router.delete("/delete", isAdmin, async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.body.id);
    return res.json({ deleted: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "An error has during dish deletion" });
  }
});

// @route   GET api/dishes/tags
// @desc    List of tags
// @access  Private
router.get("/tags", isUser, async (req, res) => {
  return res.json(Tags);
});

// @route   GET api/dishes/list
// @desc    List dishes
// @params  page,tag,sort_by,ascending
// @access  Private
router.get("/list", isUser, async (req, res) => {
  try {
    let dishes = await Dish.find(
      req.query.tag !== "al"
        ? {
            type: { $in: req.query.tag },
          }
        : null
    )
      .sort({ [req.query.sort_by]: req.query.ascending })
      .limit(100);
    dishes = dishes.map((dish) => extractDishDetails(dish));
    return res.json(dishes);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Failed to acquire food list" });
  }
});

module.exports = router;
