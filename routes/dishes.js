const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../utils/auth");
const Dish = require("../models/Dishes");
const { uploadFile } = require("../utils/uploader");
const {
  validateDishEntry,
  validateDishUpdate,
} = require("../utils/validation/dish_val");

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

router.post("/add", [auth.isAdmin, multer().any()], async (req, res) => {
  const { errors, isValid } = validateDishEntry(req.body);
  let hasValidFile = false;
  if (!isValid) return res.status(400).json(errors);
  if (
    req.files.length != 0 &&
    req.files[0].mimetype.substring(0, 5) !== "image"
  )
    return res.status(400).json({ cover: "Only image files are allowed" });
  else hasValidFile = true;
  try {
    const dish = await Dish.findOne({ name: req.body.name });
    if (dish)
      return res.status(400).json({ name: "Cannot use same name twice" });
    let url;
    if (hasValidFile) url = await uploadFile(req.files[0]);
    const newDish = new Dish({
      name: req.body.name,
      price: req.body.price,
      type: ["a", "b", "c"],
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

module.exports = router;
