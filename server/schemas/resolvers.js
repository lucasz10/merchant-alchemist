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
    // Creates a store with all possible ingredients and potions initialized
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
    // Handles model updates when a user buys ingredients
    buyIngredient: async (parent, { ingredientName, storeId, quantity }) => {
      const ingredient = await Ingredient.findOne({
        ingredientName: ingredientName,
      });
      const store = await Store.findOne({ _id: storeId });

      // Check that ingredient and store exist in the database
      if (!ingredient) return `No ingredient with name: ${ingredientName}`;
      if (!store) return `No store with ID: ${storeId}`;

      const { buyPrice } = ingredient;
      const { goldCount } = store;
      const total_cost = buyPrice * quantity;

      // Check that ingredient can be purchased
      if (goldCount < total_cost) {
        return { message: "Not enough gold to buy this ingredient" };
      }

      const updated_store = await Store.findOneAndUpdate(
        { _id: storeId, "ingredients.ingredientName": ingredientName },
        { $inc: { goldCount: -total_cost, "ingredients.$.owned": +quantity } },
        { new: true }
      );

      return updated_store;
    },
    // Handles model updates when a user wishes to sell potions
    sellPotion: async (parent, { potionName, storeId }) => {
      const potion = await Potion.findOne({ potionName: potionName });
      const store = await Store.findOne({
        _id: storeId,
        "potions.potionName": potionName,
      });

      // Filters through potions in the store model to find a match
      const potionsArray = store.potions;
      const potionSold = potionsArray.filter(
        (potion) => potion.potionName === potionName
      )[0];

      // Makes sure there is at least 1 potion to sell
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
    // Handles the model updates when a user wishes to brew a potion
    brewPotion: async (parent, { potionName, storeId }) => {
      const potion = await Potion.findOne({ potionName: potionName });
      const store = await Store.findOne({ _id: storeId });

      // Check that ingredient and store exist in the database
      if (!potion) return { message: `No potion with name: ${potionName}` };
      if (!store) return { message: `No store with ID: ${storeId}` };

      // Since there was potential implementation for an array of required ingredients, that's how the Potion model was initialized
      // For now, potions only require 1 ingredient, so we extract that ingredient from that array through deconstruction
      const [ req_ingredientName ] = potion.reqIngredients;
      
      // Get all ingredients in the store, then find the ingredient by name
      const { ingredients } = store;
      const [ required_ingredient ] = ingredients.filter(({ ingredientName }) => ingredientName === req_ingredientName);

      // Catch to make sure there's ingredients owned
      if (required_ingredient.owned < 1) {
        return {
          message: `Not enough of ${required_ingredient.ingredientName} to brew potion!`,
        };
      }

      // Updates the store model to remove from the ingredient used, and add to a potion that was newly brewed
      const updated_store = await Store.findOneAndUpdate(
        {
          _id: storeId,
          "potions.potionName": potionName,
          "ingredients.ingredientName": required_ingredient.ingredientName,
        },
        { $inc: { "ingredients.$.owned": -1, "potions.$.owned": +1 } },
        { new: true }
      );
      return updated_store;
    },
  },
};

module.exports = resolvers;
