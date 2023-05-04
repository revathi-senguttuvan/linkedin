const userservice= require("../services/userservice.js")
const auth= require("../authen/user_authen.js")
const router= require('express').Router()

router.post('/signup',userservice.adduser)
router.get('/login',userservice.getuser)
router.get('/check',userservice.login)
module.exports=router