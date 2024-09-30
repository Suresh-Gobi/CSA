const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../Models");

const resolvers = {
  users: async () => {
    return await User.findAll();
  },

  registerUser: async ({
    username,
    email,
    role,
    password,
    first_name,
    last_name,
    phone_number,
    profile_picture,
    date_of_birth,
    address,
  }) => {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = await User.create({
      id: uuidv4(), // Generate a unique ID using UUID
      username,
      email,
      role,
      password: hashedPassword,
      first_name, // New field
      last_name, // New field
      phone_number, // New field
      profile_picture, // New field
      date_of_birth, // New field
      address, // New field
    });

    return user;
  },

  loginUser: async ({ email, password }) => {
    // Check if the user exists by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Return user details (omit password for security)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      first_name: user.first_name, // Include new fields
      last_name: user.last_name, // Include new fields
      phone_number: user.phone_number, // Include new fields
      profile_picture: user.profile_picture, // Include new fields
      date_of_birth: user.date_of_birth, // Include new fields
      address: user.address, // Include new fields
    };
  },
};

module.exports = resolvers;
