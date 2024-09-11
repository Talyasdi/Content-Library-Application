const User = require("../models/userModel");

// login user
const loginUser = (req, res) => {
  res.json({ msg: "login user" });
};

// signup user
const signupUser = async function (req, res) {
  const { userName, email, password, repPassword, age } = req.body;
  try {
    const user = await User.signup(userName, email, password, repPassword, age);
    res.status(201).json({ email, user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }

};

module.exports = { loginUser, signupUser };
