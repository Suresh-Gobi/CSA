const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    role: String!
    email: String!
    first_name: String!          # New field
    last_name: String!           # New field
    phone_number: String         # New field (optional)
    profile_picture: String      # New field (optional)
    date_of_birth: String        # New field (optional)
    address: String              # New field (optional)
  }

  type Query {
    users: [User]
  }

  type Mutation {
    registerUser(
      username: String!,
      email: String!,
      role: String!,
      password: String!,
      first_name: String!,       # New field
      last_name: String!,        # New field
      phone_number: String,      # New field (optional)
      profile_picture: String,   # New field (optional)
      date_of_birth: String,     # New field (optional)
      address: String            # New field (optional)
    ): User
  }
`);

module.exports = schema;
