const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    role: String!
    email: String!
    first_name: String!
    last_name: String!
    phone_number: String
    profile_picture: String
    date_of_birth: String
    address: String
    is_active: Boolean!  
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {            
    user(token: String!): User
  }

  type Mutation {
    registerUser(
      username: String!,
      email: String!,
      role: String,
      password: String!,
      first_name: String,
      last_name: String,
      phone_number: String,
      profile_picture: String,
      date_of_birth: String,
      address: String
    ): User                       

    loginUser(email: String!, password: String!): AuthPayload! 
  }
`);

module.exports = schema;
