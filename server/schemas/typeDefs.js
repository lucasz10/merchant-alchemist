const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Store {
    _id: ID
    storeName: String
    potions: [CurrentPotion]!
    ingredients: [CurrentIngredient]!
    goldCount: Int
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
    store(storeId: ID!): Store
    ingredients: [Ingredient]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    buyIngredient(ingredientId: ID!, storeId: ID!): Store
    sellPotion(potionId: ID!, storeId: ID!): Store
  }
`;

// potions: [Potion]
// potion(potionName: String!): Potion
// ingredient(ingredientName: String!): Ingredient
module.exports = typeDefs;
