const { AuthenticationError } = require("apollo-server-express");
// Need to import models for resolvers
const { User, Ingredient, Potion, Store } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Getting the information from the database
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    stores: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Store.find(params).sort({ createdAt: -1 });
    },
    store: async (parent, { storeId }) => {
      return Store.findOne({ _id: storeId });
    },
    ingredients: async () => {
      return Ingredient.find();
    },
    potions: async () => {
      return Potion.find();
    },
  },
  // Changing the information in the database
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Initialize new user
      await User.create({ username, email, password });

      const ingredients = await Ingredient.find();
      const initial_ingredients = ingredients.map(
        ({ ingredientName, desc }) => {
          return { ingredientName, desc, owned: 0 };
        }
      );

      const potions = await Potion.find();
      const initial_potions = potions.map(({ potionName, desc }) => {
        return { potionName, desc, owned: 0 };
      });

      // Initialize new store
      const store = await Store.create({
        storeName: `${username}'s Store`,
        storeOwner: username,
        ingredients: initial_ingredients,
        potions: initial_potions,
      });

      const user = await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { stores: store._id } }
      );

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    createStore: async (parent, { storeName, username }) => {
      const ingredients = await Ingredient.find();
      const initial_ingredients = ingredients.map(
        ({ ingredientName, desc }) => {
          return { ingredientName, desc, owned: 0 };
        }
      );

      const potions = await Potion.find();
      const initial_potions = potions.map(({ potionName, desc }) => {
        return { potionName, desc, owned: 0 };
      });

      const store = await Store.create({
        storeName,
        storeOwner: username,
        ingredients: initial_ingredients,
        potions: initial_potions,
      });

      await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { stores: store._id } }
      );

      return store;
    },
    buyIngredient: async (parent, { ingredientName, storeId }) => {
      const ingredient = await Ingredient.findOne({
        ingredientName: ingredientName,
      });
      const store = await Store.findOne({ _id: storeId });

      // Check that ingredient and store exist in the database
      if (!ingredient) return `No ingredient with name: ${ingredientName}`;
      if (!store) return `No store with ID: ${storeId}`;

      const { buyPrice } = ingredient;
      const { goldCount } = store;

      // Check that ingredient can be purchased
      if (goldCount < buyPrice) {
        return { message: "Not enough gold to buy this ingredient" };
      }

      const updated_store = await Store.findOneAndUpdate(
        { _id: storeId, "ingredients.ingredientName": ingredientName },
        { $inc: { goldCount: -buyPrice, "ingredients.$.owned": +1 } },
        { new: true }
      );

      return updated_store;
    },
    sellPotion: async (parent, { potionName, storeId }) => {
      const potion = await Potion.findOne({ potionName: potionName });
      const store = await Store.findOne({
        _id: storeId,
        "potions.potionName": potionName,
      });

      const potionsArray = store.potions;
      const potionSold = potionsArray.filter(
        (potion) => potion.potionName === potionName
      )[0];

      console.log(potionSold);

      if (potionSold.owned < 1) {
        return { message: "No potions to sell!" };
      }

      const { sellPrice } = potion;

      const updated_store = await Store.findOneAndUpdate(
        { _id: storeId, "potions.potionName": potionName },
        { $inc: { goldCount: +sellPrice, "potions.$.owned": -1 } },
        { new: true }
      );
      return updated_store;
    },
    brewPotion: async (parent, { potionName, storeId }) => {
      const potion = await Potion.findOne({ potionName: potionName });
      const store = await Store.findOne({ _id: storeId });

      // Check that ingredient and store exist in the database
      if (!potion) return `No potion with name: ${potionName}`;
      if (!store) return `No store with ID: ${storeId}`;

      const req_ingredient = potion.reqIngredients[0];

      const ingredientsArray = store.ingredients;
      const ingredientOwned = ingredientsArray.filter(
        (ingredient) => ingredient.ingredientName === req_ingredient
      )[0];

      console.log(ingredientOwned);

      if (ingredientOwned.owned < 1) {
        return {
          message: `Not enough of ${ingredientOwned.ingredientName} to brew potion!`,
        };
      }

      const updated_store = await Store.findOneAndUpdate(
        {
          _id: storeId,
          "potions.potionName": potionName,
          "ingredients.ingredientName": ingredientOwned.ingredientName,
        },
        { $inc: { "ingredients.$.owned": -1, "potions.$.owned": +1 } },
        { new: true }
      );
      return updated_store;
    },
  },
};

module.exports = resolvers;
