const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/auth");

const userController = require("../Controllers/user.controller");

router.get("/users", userController.getAllUsers);
router.get(
  "/loggedusers",
  authMiddleware,
  authorize(["user"]),
  userController.getLoggedUserDetails
);

module.exports = router;
