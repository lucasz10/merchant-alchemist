const { AuthenticationError } = require("apollo-server-express");
// Need to import models for resolvers
const { signToken } = require("../utils/auth");

const resolvers = {};

module.exports = resolvers;
