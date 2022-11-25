const { Schema, model } = require("mongoose");

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  inventory: [
    {
      potions: [
        {
          type: String,
        },
      ],
      ingredients: [
        {
          type: String,
        },
      ],
    },
  ],
});

const Store = model("Store", storeSchema);

module.exports = Store;
