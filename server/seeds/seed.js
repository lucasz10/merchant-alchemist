const db = require("../config/connection");
const { User, Potion, Ingredient, Store } = require("../models");
const userSeeds = require("./userSeeds.json");
const potionSeeds = require("./potionSeeds.json");
const ingredientSeeds = require("./ingredientSeeds.json");
const storeSeeds = require("./storeSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Potion.deleteMany({});
    await Ingredient.deleteMany({});
    await Store.deleteMany({});

    await User.create(userSeeds);
    await Potion.create(potionSeeds);
    await Ingredient.create(ingredientSeeds);
    await Store.create(storeSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
