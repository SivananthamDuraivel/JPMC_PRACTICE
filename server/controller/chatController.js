
const path = require('path');
const chatModel=require('../models/chatModel')
const userModel=require('../models/userModel');
const { group } = require('console');

//to find the target user and curr user's chat
const accessChat =async (req, res) => {
    const userId  = req.body.id;
    console.log("one : ",req._id)
    console.log("two : ", userId)

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMsg");

    
    isChat = await userModel.populate(isChat, {
        path: "latestMsg.sender",
        select: "name profile email",
    });

    
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req._id, userId],
        };

        try {
            const createdChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

//to find the chats that are part of the current user

const fetchChats = async (req, res) => {
    try {
        // Step 1: Find chats that include the current user
        let chats = await chatModel.find({ users: { $elemMatch: { $eq: req._id } } })
            .populate("users", "-password")           
            .populate("groupAdmin", "-password")      
            .populate("latestMsg")                
            .sort({ updatedAt: -1 });                 

        // Step 2: Further populate the 'sender' field of 'latestMessage' in each chat
        chats = await userModel.populate(chats, {
            path: "latestMsg.sender",             
            select: "name profile email",                 
        });
        res.status(200).send(chats);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const createGroup =async(req,res)=>{

    console.log("create Group")
    if(!req.body.users || !req.body.name)
        return res.json("cant create")

    //if array is passed as JSON , then parsing is must (enclose by [\".....\"]) to make it stringified
    var users = JSON.parse(req.body.users)
    if(users.length<2)
        return res.json("need atleast 2 members")
    users.push(req.user)

    try{
        const groupChat = {
            chatName:req.body.name,
            isGroupChat:true,
            users:users,
            groupAdmin:req.user
        }
        const createdGroup = await chatModel.create(groupChat)
        const FullChat = await chatModel.find({ _id: createdGroup._id })
        .populate("users", '-password')
        .populate("groupAdmin","-password")
        return res.json(FullChat)
    }
    catch(err)
    {
        console.log(err)
    }
}

const renameGroup=async(req,res)=>{
    const {chatId,newName}=req.body
    try{
        const findChat = chatModel.find({_id:chatId})
        if(!findChat)
            return res.json("no such chat exists")
        const updatedChat = await chatModel.findByIdAndUpdate(chatId,{chatName:newName},{new:true})
                            .populate("users",-"password")
                            .populate("groupAdmin","-password")
        return res.json(updatedChat)
    }
    catch(err)
    {
        console.log(err)
    }

}

const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body
    try {
        const findChat = chatModel.find({ _id: chatId })
        if (!findChat)
            return res.json("no such chat exists")
        const updatedChat = await chatModel.findByIdAndUpdate(chatId,
            {$push : { users: userId },}, { new: true })
            .populate("users", -"password")
            .populate("groupAdmin", "-password")
        return res.json(updatedChat)
    }
    catch (err) {
        console.log(err)
    }

}

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body
    try {
        const findChat = chatModel.find({ _id: chatId })
        if (!findChat)
            return res.json("no such chat exists")
        const updatedChat = await chatModel.findByIdAndUpdate(chatId,
            { $pull: { users: userId }, }, { new: true })
            .populate("users", -"password")
            .populate("groupAdmin", "-password")
        return res.json(updatedChat)
    }
    catch (err) {
        console.log(err)
    }

}



module.exports={accessChat,fetchChats,createGroup,renameGroup,addToGroup,removeFromGroup}