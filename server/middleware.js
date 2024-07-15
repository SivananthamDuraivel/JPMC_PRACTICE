const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

const express=require('express')
const app=express()
app.use(cookieParser())

const secretKey=process.env.KEY

const withAuthentication = async (req,res,next)=>{
    const token = req.cookie.token;   //cookie.<name> :- that we gave during creation
    if(!token)
        return 
    try{
        const user = await jwt.verify(token,secretKey)
        req.email=user.email  //for making further accessing of DB
        next()
    }
    catch(err)
    {
        console.log(err);
        return 
    }
}

module.exports={withAuthentication}