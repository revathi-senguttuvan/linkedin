const userservice= require("../services/userservice.js")
const auth= require("../authen/user_authen.js")
const router= require('express').Router()
router.post('/signup',userservice.adduser)
router.put('/successfullsignup',userservice.successfullsign)

router.get('/getuser',userservice.getuser)
router.post('/login',userservice.login)
router.put('/update/:id',userservice.profileupdate)
// router.put('/connect',userservice.connect)
router.put('/private',userservice.public)
router.get('/find',userservice.find)
router.put('/block',userservice.block)
router.put('/profileupload/:id',userservice.image)



module.exports=router