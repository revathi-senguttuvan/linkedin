const router4= require('express').Router()
const admin_service= require("../services/admin_service")

router4.post('/addadmin',admin_service.addadmin)
router4.put('/adminotp',admin_service.successfullsign)
router4.delete('/deleteuser',admin_service.deltuser)



module.exports=router4