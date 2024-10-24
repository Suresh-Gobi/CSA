const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../Models");

const resolvers = {
  users: async () => {
    try {
      return await User.findAll({
        attributes: { exclude: ["password"] }, // Exclude passwords from results
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
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

    return {
      ...user.get(), // Spread user object to return all fields
      password: undefined, // Exclude password from result
    };
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

    // Return the generated token
    return {
      token,
    };
  },

  user: async (_, { token }) => {
    if (!token) {
      throw new Error("Authentication token is required.");
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch the user details from the database
      const user = await User.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      // Handle different types of errors
      if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid authentication token.");
      }
      if (error.name === "TokenExpiredError") {
        throw new Error("Authentication token has expired.");
      }
      throw new Error("Error fetching user details");
    }
  },
};

module.exports = resolvers;
