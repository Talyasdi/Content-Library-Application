const express = require("express");

const router = express.Router();

const { loginUser, signupUser } = require("../controllers/userController");
const { forgotPassword, resetPassword } = require("../controllers/authController");

// login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//forgot password route
router.post("/forgot-password", forgotPassword);

//reset password route
router.post("/reset-password/:token", resetPassword);

module.exports = router;
