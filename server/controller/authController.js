const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const express=require('express')
const app=express()

app.use(cookieParser())

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

        const token = jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
        res.cookie('token',token,{httpOnly:true,maxAge:3600000})
        // 18 00 000 ms = 30 minutes
        
        //By setting httpOnly: true, the cookie cannot be accessed via JavaScript 
        //running on the client side (e.g., document.cookie). 

        if (passwordMatch) {
            return res.status(200).json("valid");
        } else {
            return res.json("Invalid password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};

const getFeature= async (req,res)=>{
    const email=req.email
    
    const user=userModel.findOne({email:email})
    console.log("email from cookie : ",email)
    console.log(user.data)
    return res.json(user.data)
}

module.exports = { signUp, signIn, getFeature};
