const express =require('express')
const router=express.Router()

const {signUp,signIn,getFeature}=require('../controller/authController')
const {withAuthentication} =require('../middleware')

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/feature',withAuthentication,getFeature)

module.exports=router

