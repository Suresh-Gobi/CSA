const express = require("express");
const router = express.Router();

const userController = require("../Controllers/user.controller");


router.get("/users", userController.getAllUsers);
router.get("/loggedusers", userController.getLoggedUserDetails);

module.exports = router;
