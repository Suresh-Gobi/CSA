const bcrypt = require('bcrypt');
const { User } = require('../Models'); 

const resolvers = {
  users: async () => {
    return await User.findAll();
  },
  registerUser: async ({ username, email, password }) => {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  },
};

module.exports = resolvers;
