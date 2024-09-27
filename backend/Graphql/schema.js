const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User
  }
`);

module.exports = schema;
