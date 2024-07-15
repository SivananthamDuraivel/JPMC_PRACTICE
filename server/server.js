require('dotenv').config()

const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cors(
    {
        origin:["http://localhost:5173",],
        credentials:true
    }
))


const authRouter=require('./router/authRouter')
app.use(authRouter)
app.use('/auth',authRouter)



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{console.log(`DB connected and server listening at PORT : ${process.env.PORT}`)})
})
.catch(err=>{
    console.log(err)
})