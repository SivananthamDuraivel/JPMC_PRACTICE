const jwt = require('jsonwebtoken');
const userModel = require('./models/userModel');

const secret = process.env.KEY;

const withAuth = async (req, res, next) => {
  try {
    console.log("reached middleware");
    const token = req.cookies.mytoken;
    console.log("from middleware: ", token);
    if (!token) {
      return res.json('no token');
    }
    const decoded = await jwt.verify(token, secret);

    req.email = decoded.email;
    req.role  = decoded.role;
    user= await userModel.findOne({email:decoded.email});
    // console.log("USER : ",user)
    req._id=user._id
    req.user=user
    
    console.log(req.email+":::"+req.role+":::"+req._id);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.json('invalid token');
  }
};


module.exports = { withAuth };
