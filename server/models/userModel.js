const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    email :{type :String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:'user'}
})

module.exports=mongoose.model('userModel',userSchema)
