const jwt = require('jsonwebtoken');

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
    console.log(req.email+":::"+req.role);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.json('invalid token');
  }
};


module.exports = { withAuth };
