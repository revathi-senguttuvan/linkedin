const router3= require('express').Router()
const connect= require("../controller/connect_controller")
const usrauth= require("../authen/user_authen.js")
const validation= require("../controller/Joi.js")

router3.post('/connect',validation.connect_validation,usrauth.authenticateToken,connect.connect1)
router3.get('/getconnect',validation.connect_validation,connect.getconnect)
router3.put("/accept",validation.connect_validation,usrauth.authenticateToken,connect.accept)
router3.put("/reject",validation.connect_validation,usrauth.authenticateToken,connect.reject)
router3.put("/reconnect",validation.connect_validation,usrauth.authenticateToken,connect.reconnect)
router3.get("/getaccept",validation.connect_validation,usrauth.authenticateToken,connect.getaccept)


module.exports=router3