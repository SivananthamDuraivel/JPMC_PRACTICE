const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
  try {
    console.log("Entered signup");

    const {name, email, password, confirmPassword,imgUrl} = req.body;

    const existingName = await userModel.findOne({ name: name });
    if (name === existingName)
      return res.json("Username already exists ");

    if (password !== confirmPassword)
      return res.json("Password and confirm password must be the same");

    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail)
      return res.json("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    if(imgUrl.length>0)
      await userModel.create({ name:name,email: email, password: hashedPassword ,profile:imgUrl});
    else
      await userModel.create({ name: name, email: email, password: hashedPassword});

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
    const resultUser = await userModel.findOne({ email: email }).select("-password");

    if (passwordMatch) {
      const token = jwt.sign({ email: existingUser.email,role:existingUser.role}, process.env.KEY, { expiresIn: '1h' });
      res.cookie('mytoken', token, { httpOnly: true, maxAge: 3600000 });
      console.log("token", token);
      return res.status(200).json({"response":"valid","user":resultUser});
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

const adminFeature = async (req, res) => {
  try {
    
    console.log(req.role)
    if(req.role!=="admin")
      return res.json("You aren't an admin")

    const users = await userModel.find({})
    console.log(users)
    if (users && users.length>0) {
      return res.json(users);
    } else {
      return res.status(404).json("No data found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};

const getPhoto = async (req, res) => {
  try {
    const email = req.email;

    const user = await userModel.findOne({ email: email });
    console.log("email from cookie: ", email);
    if (user) {
      console.log(user.profile)
      return res.json({ profile: user.profile });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}


module.exports = { signUp, signIn, getFeature ,adminFeature ,getPhoto};
