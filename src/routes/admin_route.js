const router4= require('express').Router()
const admin_service= require("../controller/admin_controller")
const auth= require("../authen/admin_authen.js")
const validation= require("../controller/Joi.js")


router4.post('/addadmin',validation.update_validation,auth.authenticateToken,admin_service.addadmin)
router4.put('/adminotp',validation.update_validation,auth.authenticateToken,admin_service.successfullsign)
router4.delete('/deleteuser',validation.update_validation,auth.authenticateToken,admin_service.deltuser)



module.exports=router4