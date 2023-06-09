const express = require('express');
const app = express.Router();
app.use(express.json());
const usr_router= require('./user_route')
const post_router=require('./post_route')
const job_router=require('./job_route')
const con_router3=require('./connect_route')
const admin_router4=require('./admin_route')


app.use(express.json())
app.use('/user/li',usr_router)
app.use('/post/li',post_router)
app.use('/job/li',job_router)
app.use('/connect/li',con_router3)
app.use('/admin/li',admin_router4)

module.exports ={app};