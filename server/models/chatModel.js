const mongoose=require('mongoose')

const chatSchema=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:'userModel'
                }],
        latestMsg:{type:mongoose.Schema.Types.ObjectId,ref:"msgModel"},
        groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}
    },
    {timestamps:true}
)

module.exports=mongoose.model("chatModel",chatSchema)