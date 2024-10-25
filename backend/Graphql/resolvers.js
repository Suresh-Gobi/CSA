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
      ...user.get(),
      password: undefined,
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
    return {
      token,
    };
  },

  users: async () => {
    return await User.findAll();
  },

  // user: async ({ id }) => {
  //   if (!id) {
  //     throw new Error("ID is required");
  //   }
  //   const user = await User.findByPk(id);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   return user;
  // },

  // user: async (_, __, context) => {
  //   try {
  //     // Get the token from the authorization header
  //     const authHeader = context.headers.authorization;
  //     if (!authHeader) {
  //       throw new Error("Authorization header is missing");
  //     }

  //     const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'
  //     if (!token) {
  //       throw new Error("Token is missing");
  //     }

  //     // Verify and decode the token to get the user ID
  //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //     const userId = decodedToken.id;

  //     // Fetch the user details based on the decoded user ID
  //     const user = await User.findByPk(userId);
  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     // Return the user details
  //     return user;
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     throw new Error("Error fetching user details: " + error.message);
  //   }
  // },
};

module.exports = resolvers;
