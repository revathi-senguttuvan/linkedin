const router2= require('express').Router()
const jobservice= require("../services/job_service")
const usrauth= require("../authen/user_authen.js")

router2.post('/job',usrauth.authenticateToken,jobservice.jobapplied)
router2.get('/getjob',usrauth.authenticateToken,jobservice.getapplicantdetails)

module.exports=router2