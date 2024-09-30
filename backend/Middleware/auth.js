const jwt = require('jsonwebtoken');

// function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Continue to the next route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};