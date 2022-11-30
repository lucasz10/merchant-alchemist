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
      databaseId: {
        type: String,
      },
      owned: {
        type: Number,
      },
    },
  ],
  ingredients: [
    {
      databaseId: {
        type: String,
      },
      owned: {
        type: Number,
      },
    },
  ],
  goldCount: {
    type: Number,
  },
});

const Store = model("Store", storeSchema);

module.exports = Store;
