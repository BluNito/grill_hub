const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../utils/auth");
const Dish = require("../models/Dishes");
const {
  validateDishEntry,
  validateDishUpdate,
} = require("../utils/validation/dish_val");

router.post(
  "/add",
  [auth.isAdmin, multer({ dest: "temp/" }).any()],
  async (req, res) => {
    const { errors, isValid } = validateDishEntry(req.body);
    if (!isValid) return res.status(400).json(errors);
    if (
      req.files.length != 0 &&
      req.files[0].mimetype.substring(0, 5) !== "image"
    )
      return res.status(400).json({ cover: "Only image files are allowed" });
    try {
      const dish = await Dish.findOne({ name: req.body.name });
      if (dish)
        return res.status(400).json({ name: "Cannot use same name twice" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "An error has occured during food entry" });
    }
  }
);

module.exports = router;
