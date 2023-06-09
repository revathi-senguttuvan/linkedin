const router1= require('express').Router()
const postservice= require("../controller/post_controller")
const usrauth= require("../authen/user_authen.js")
const validation= require("../controller/Joi.js")


router1.post('/text',validation.post_validation,usrauth.authenticateToken,postservice.addtext)
router1.post('/job',validation.post_validation,usrauth.authenticateToken,postservice.addjob)
router1.get('/getalljob',usrauth.authenticateToken,postservice.getjob)
router1.get('/getallpost',validation.post_validation,usrauth.authenticateToken,postservice.postdetail)

router1.post('/link',validation.post_validation,usrauth.authenticateToken,postservice.link)
router1.post('/image',usrauth.authenticateToken,postservice.image)
router1.post('/uploadall',validation.post_validation,usrauth.authenticateToken,postservice.uploadall)
router1.delete('/deletepost',validation.post_validation,usrauth.authenticateToken,postservice.deletepost)
//router1.delete('/deletejob',validation.post_validation,usrauth.authenticateToken,postservice.deletejob)




module.exports=router1