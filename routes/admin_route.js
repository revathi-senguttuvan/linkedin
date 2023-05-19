const router4= require('express').Router()
const admin_service= require("../services/admin_service")
const auth= require("../authen/admin_authen.js")

router4.post('/addadmin',auth.authenticateToken,admin_service.addadmin)
router4.put('/adminotp',auth.authenticateToken,admin_service.successfullsign)
router4.delete('/deleteuser',auth.authenticateToken,admin_service.deltuser)



module.exports=router4