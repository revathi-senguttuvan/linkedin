const router= require('express').Router()
const userservice= require("../controller/user_controller")
const auth= require("../authen/admin_authen")
const usrauth= require("../authen/user_authen")
const validation= require("../controller/Joi")


router.post('/signup',validation.update_validation,userservice.adduser)
router.put('/successfullsignup',validation.update_validation,userservice.successfullsign)
router.get('/getuser',userservice.getuser)
router.post('/login',validation.update_validation,userservice.login)
router.put('/update/:id',validation.update_validation,usrauth.authenticateToken,userservice.profileupdate)
router.put('/private',validation.update_validation,usrauth.authenticateToken,userservice.public)
router.get('/find',validation.update_validation,userservice.find)
router.put('/block',validation.update_validation,auth.authenticateToken,userservice.block)
router.put('/profileupload/:id',validation.update_validation,usrauth.authenticateToken,userservice.image)
router.put('/vrymailchange',validation.update_validation,usrauth.authenticateToken,userservice.verifyemailchange)
module.exports=router