const { default: mongoose } = require('mongoose')
const moongose=require('mongoose')

const msgSchema=mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
        content:{type:String,trime:true},
        chat:{type:moongose.Schema.Types.ObjectId,ref:"chatModel"}
    },
    {
        timestamps:true
    }
)

module.exports=moongose.model("msgModel",msgSchema)