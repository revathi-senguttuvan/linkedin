const express=require("express");
const router= require('./routes/user_route')

const app=express()
app.use(express.json())
app.use('/user/li',router)







const port=9000

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server started in ${port}`)
    }
})