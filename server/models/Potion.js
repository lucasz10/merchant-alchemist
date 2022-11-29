const { Schema, model } = require("mongoose");

const potionSchema = new Schema({
  potionName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  desc: {
    type: String,
  },
  reqIngredients: [
    {
      type: String,
    },
  ],

  sellPrice: {
    type: Number,
  },
});

const Potion = model("Potion", potionSchema);

module.exports = Potion;
