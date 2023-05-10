const router1= require('express').Router()
const postservice= require("../services/postservice.js")
router1.post('/text',postservice.addtext)
router1.put('/job',postservice.addjob)



module.exports=router1