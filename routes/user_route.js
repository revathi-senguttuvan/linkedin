const userservice= require("../services/userservice.js")
const auth= require("../authen/admin_authen.js")
const usrauth= require("../authen/user_authen.js")
const router= require('express').Router()
router.post('/signup',userservice.adduser)
router.put('/successfullsignup',userservice.successfullsign)
router.get('/getuser',userservice.getuser)
router.post('/login',userservice.login)
router.put('/update/:id',usrauth.authenticateToken,userservice.profileupdate)
router.put('/private',usrauth.authenticateToken,userservice.public)
router.get('/find',userservice.find)
router.put('/block',auth.authenticateToken,userservice.block)
router.put('/profileupload/:id',usrauth.authenticateToken,userservice.image)
router.put('/vrymailchange',usrauth.authenticateToken,userservice.vryemailchange)
module.exports=router