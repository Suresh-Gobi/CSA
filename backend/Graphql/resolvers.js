const db = require('../Models');
const User = db.User;

// Define resolvers for GraphQL queries and mutations
const resolvers = {
  users: async () => {
    return await User.findAll();
  },
  addUser: async ({ name, email, password }) => {
    const user = await User.create({ name, email, password });
    return user;
  },
};

module.exports = resolvers;
