const router2= require('express').Router()
const jobservice= require("../controller/job_controller")
const usrauth= require("../authen/user_authen.js")
const validation= require("../controller/Joi.js")

router2.post('/job',validation.job_validation,usrauth.authenticateToken,jobservice.jobapplied)
router2.get('/getjob',validation.job_validation,usrauth.authenticateToken,jobservice.getapplicantdetails)

module.exports=router2