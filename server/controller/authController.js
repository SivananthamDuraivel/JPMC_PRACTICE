const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    console.log("Entered signup");

    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.json("Password and confirm password must be the same");

    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail)
      return res.json("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ email: email, password: hashedPassword });

    return res.status(201).json("added");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

const signIn = async (req, res) => {
  try {
    console.log("Entered signin");

    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser)
      return res.json("User not registered");

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      const token = jwt.sign({ email: existingUser.email }, process.env.KEY, { expiresIn: '1h' });
      res.cookie('mytoken', token, { httpOnly: true, maxAge: 3600000 });
      console.log("token", token);
      return res.status(200).json("valid");
    } else {
      return res.json("Invalid password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

const getFeature = async (req, res) => {
  try {
    const email = req.email;

    const user = await userModel.findOne({ email: email }).select('-password');
    console.log("email from cookie: ", email);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

module.exports = { signUp, signIn, getFeature };
