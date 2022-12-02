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
    store: async (parent, { storeId }) => { 
      return Store.findOne({ _id: storeId });
    },
    ingredients: async () => {
      return Ingredient.find();
    }
  },
  // Changing the information in the database
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
    buyIngredient: async (parent, { ingredientId, storeId }) => {
      const ingredient = await Ingredient.findOne({ _id: ingredientId });
      const price = ingredient.buyPrice;
      const store = await Store.findOne({ _id: storeId });
      const goldCount = store.goldCount;

      // Check if the store has enough gold to buy the ingredient
      if (goldCount < price) {
        throw new ApolloError("Not enough gold to buy this ingredient");
      }

      store.findOneAndUpdate(
        { _id: storeId }, { $inc: { goldCount: -goldCount, "goldPrice": price } }, { new: true },
        { _id: ingredientId }, { $inc: { owned: 1 } }, 
      );
      return { ingredient, store };
    },
    sellPotion: async (parent, { potionId, storeId }) => {
      const potion = await Potion.findOne({ _id: potionId });
      const price = potion.sellPrice;
      const store = await Store.findOne({ _id: storeId });
      const goldCount = store.goldCount;

      store.findOneAndUpdate(
        { _id: storeId }, { $inc: { goldCount: goldCount, "goldPrice": price } }, { new: true },
        { _id: potionId }, { $inc: { owned: -1 } }, { new: true },
      );
      return { potion, store };
    }
  },
}

module.exports = resolvers;
