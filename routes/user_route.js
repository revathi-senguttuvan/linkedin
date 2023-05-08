const userservice= require("../services/userservice.js")
const auth= require("../authen/user_authen.js")
const router= require('express').Router()

router.post('/signup',userservice.adduser)
router.get('/getuser',auth.authenticateToken,userservice.getuser)
router.post('/login',userservice.login)
router.put('/update/:id',userservice.profileupdate)

router.put('/connect',userservice.connect)


module.exports=router