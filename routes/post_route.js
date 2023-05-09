const router1= require('express').Router()
const postservice= require("../services/postservice.js")
router1.post('/text',postservice.adduser)



module.exports=router1