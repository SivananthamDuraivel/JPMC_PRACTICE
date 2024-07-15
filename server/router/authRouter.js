const express =require('express')
const router=express.Router()

const {signUp,signIn,getFeature}=require('../controller/authController')
const authenticator =require('../middleware')

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/feature',authenticator,getFeature)

module.exports=router

