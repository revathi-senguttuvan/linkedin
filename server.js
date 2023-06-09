const express=require("express");
const app=express()
const intial_route = require('./src/routes/router');
app.use(express.json());
app.use(intial_route.app);



   
	




const port=9000

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server started in ${port}`)
    }
})