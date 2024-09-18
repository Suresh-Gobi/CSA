const { buildSchema } = require('graphql');

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
  }
`);

module.exports = schema;
