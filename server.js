const express=require("express");
const router= require('./routes/user_route')
const router1=require('./routes/post_route')

const app=express()
app.use(express.json())
app.use('/user/li',router)
app.use('/post/li',router1)



// Function to generate OTP

		
	// Declare a digits variable
	// which stores all digits
	// var digits = '0123456789';
	// let OTP = '';
	// for (let i = 0; i < 4; i++ ) {
	// 	OTP += digits[Math.floor(Math.random() * 10)];
	// }
	





				







const port=9000

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server started in ${port}`)
    }
})