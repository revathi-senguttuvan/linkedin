const router2= require('express').Router()
const jobservice= require("../services/job_service")

router2.post('/job',jobservice.jobapplied)
router2.get('/getjob',jobservice.getapplicantdetails)

module.exports=router2