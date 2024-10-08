const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      id: uuidv4(),
      username,
      email,
      role,
      password: hashedPassword,
      first_name, 
      last_name,
      phone_number, 
      profile_picture, 
      date_of_birth,
      address,
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

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // token (omit password for security)
    return {
      token, // Return the generated token
    };
  },

  // Query to get all users
  users: async () => {
    try {
      // Find all users and exclude the password field for security
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  },
};

module.exports = resolvers;
