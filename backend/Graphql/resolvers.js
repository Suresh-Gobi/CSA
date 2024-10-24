const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../Models");

const resolvers = {
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

  user: async (_, __, { token }) => {
    // Change to get token from context
    console.log("Received token:", token); // Log the received token

    try {
      // Check if the token is provided
      if (!token) {
        throw new Error("Token must be provided.");
      }

      // If token is in the format "Bearer <token>", split to get the actual token
      const tokenParts = token.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid token format. Use 'Bearer <token>'");
      }

      const actualToken = tokenParts[1]; // Extract the token

      // Verify the token
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Log the decoded token

      // Fetch user from the database
      const user = await User.findOne({
        where: { id: decoded.id }, // or decoded.email, based on your implementation
        attributes: { exclude: ["password"] },
      });

      // Check if user was found
      if (!user) {
        throw new Error("User not found");
      }

      return user; // Return the user data
    } catch (error) {
      console.error("Error:", error); // Log the error
      // Handle JWT errors
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
