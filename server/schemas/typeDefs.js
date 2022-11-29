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
    potions: [String]
    ingredients: [String]
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
