const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  potions: [
    {
      potionName: {
        type: String,
      },
      desc: {
        type: String,
      },
      owned: {
        type: Number,
      },
    },
  ],
  ingredients: [
    {
      ingredientName: {
        type: String,
      },
      desc: {
        type: String,
      },
      owned: {
        type: Number,
      },
    },
  ],
  goldCount: {
    type: Number,
    default: 100,
  },
  storeOwner: {
    type: String,
  },
});

const Store = model("Store", storeSchema);

module.exports = Store;
