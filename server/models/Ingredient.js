const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  ingredientName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  desc: {
    type: String,
  },
  buyPrice: {
    type: Number,
  },
});

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
