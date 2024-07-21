const express=require('express')
const router=express.Router()

const {accessChat,fetchChats,createGroup,renameGroup,addToGroup,removeFromGroup} = require('../controller/chatController')
const {withAuth}=require('../middleware')

router.post('/',withAuth,accessChat)
router.post('/fetch',withAuth,fetchChats)
router.post('/createGroup',withAuth,createGroup)
router.put('/renameGroup',withAuth,renameGroup)
router.put('/addToGroup',withAuth,addToGroup)
router.put('/removeFromGroup', withAuth, removeFromGroup)


module.exports=router

