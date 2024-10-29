const db = require('../Models/index');
const { User } = db;

// Get All User Details
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
    });
  }
};

//