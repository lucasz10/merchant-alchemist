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
    inventory: Array
  }

  type Potion {
    _id: ID
    potionName: String
    desc: String
    reqIngredients: Array
    sellPrice: Number
  }

  type Ingredient {
    _id: ID
    ingredientName: String
    desc: String
    buyPrice: Number
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
