const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    stores: [Store]
  }

  type Store {
    _id: ID
    storeName: String
    potions: [CurrentPotion]!
    ingredients: [CurrentIngredient]!
    goldCount: Int
    storeOwner: String
  }

  type CurrentPotion {
    _id: ID
    potionName: String
    desc: String
    owned: Int
  }

  type CurrentIngredient {
    _id: ID
    ingredientName: String
    desc: String
    owned: Int
  }

  type Potion {
    _id: ID
    potionName: String
    desc: String
    reqIngredients: [String]
    sellPrice: Int
  }

  type Ingredient {
    _id: ID
    ingredientName: String
    desc: String
    buyPrice: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    stores(username: String!): [Store]
    store(storeId: ID!): Store
    ingredients: [Ingredient]!
    potions: [Potion]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createStore(storeName: String!, username: String!): Store
    buyIngredient(ingredientName: String!, storeId: ID!, quantity: Int): Store
    sellPotion(potionName: String!, storeId: ID!): Store
    brewPotion(potionName: String!, storeId: ID!): Store
  }
`;

module.exports = typeDefs;
