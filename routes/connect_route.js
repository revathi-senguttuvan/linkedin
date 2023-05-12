const router3= require('express').Router()
const connect= require("../services/connect_service")

router3.post('/connect',connect.connect1)
router3.get('/getconnect',connect.getconnect)
router3.put("/accept",connect.accept)
router3.put("/reject",connect.reject)
router3.put("/reconnect",connect.reconnect)
router3.get("/getaccept",connect.getaccept)


module.exports=router3