const router3= require('express').Router()
const connect= require("../services/connect_service")
const usrauth= require("../authen/user_authen.js")

router3.post('/connect',usrauth.authenticateToken,connect.connect1)
router3.get('/getconnect',connect.getconnect)
router3.put("/accept",usrauth.authenticateToken,connect.accept)
router3.put("/reject",usrauth.authenticateToken,connect.reject)
router3.put("/reconnect",usrauth.authenticateToken,connect.reconnect)
router3.get("/getaccept",usrauth.authenticateToken,connect.getaccept)


module.exports=router3