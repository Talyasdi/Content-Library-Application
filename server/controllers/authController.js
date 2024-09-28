const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).json({ msg: "Please provide an email" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "Invalid email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate token
    const token = createToken(user._id);
    // Nodemailer configuration for sending email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<h2>Click the link to reset your password</h2><a href="${resetUrl}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const resetPassword = async function (req, res) {
  const { password } = req.body;
  const { token } = req.params;
  if (!password) {
    return res.status(400).json({ msg: "Please provide a password" });
  }

  // Validate password
  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({
        msg: "Password is not strong enough:\n • At least 8 characters\n • At least 1 uppercase letter\n • At least 1 lowercase letter\n • At least 1 number\n • At least 1 special character",
      });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid token or user does not exist" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Token expired or invalid" });
  }
};
module.exports = { forgotPassword, resetPassword };
