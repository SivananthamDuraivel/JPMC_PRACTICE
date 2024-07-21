const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    name:{type:String,required:true},
    email :{type :String,required:true},
    password:{type:String,required:true},
    profile: { type: String, default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    role:{type:String,default:'user'}
},{timestamps:true})

module.exports=mongoose.model('userModel',userSchema)
