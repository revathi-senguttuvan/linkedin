const router1= require('express').Router()
const postservice= require("../services/postservice.js")
const usrauth= require("../authen/user_authen.js")


router1.post('/text',usrauth.authenticateToken,postservice.addtext)
router1.post('/job',usrauth.authenticateToken,postservice.addjob)
router1.get('/getalljob',usrauth.authenticateToken,postservice.getjob)
router1.get('/getallpost',usrauth.authenticateToken,postservice.postdetail)

router1.post('/link',usrauth.authenticateToken,postservice.link)
router1.post('/image',usrauth.authenticateToken,postservice.image)
router1.post('/uploadall',usrauth.authenticateToken,postservice.uploadall)
router1.delete('/deletepost',usrauth.authenticateToken,postservice.deletepost)
router1.delete('/deletejob',usrauth.authenticateToken,postservice.deletejob)




module.exports=router1