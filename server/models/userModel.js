const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//signup static method
userSchema.statics.signup = async function (
  userName,
  email,
  password,
  repPassword,
  age
) {
  //validation

  if (!email || !password || !repPassword || !userName || !age) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    
    throw Error(
      "Password is not strong enough:\n • At least 8 characters\n • At least 1 uppercase letter\n • At least 1 lowercase letter\n • At least 1 number\n • At least 1 special character"
    );
  }

  if (password !== repPassword) {
    throw Error("Passwords do not match");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = this.create({
    userName: userName,
    email: email,
    password: hashedPassword,
    age: age,
  });

  return user;
};

//login static method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
