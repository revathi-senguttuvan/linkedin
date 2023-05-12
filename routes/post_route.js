const router1= require('express').Router()
const postservice= require("../services/postservice.js")



router1.post('/text',postservice.addtext)
router1.post('/job',postservice.addjob)
router1.get('/getalljob',postservice.getjob)
router1.post('/apply',postservice.applyjob)
router1.post('/link',postservice.link)
router1.post('/image',postservice.image)




module.exports=router1