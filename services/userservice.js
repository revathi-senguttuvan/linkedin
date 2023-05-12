const Users = require("../models/user");
const jwt = require("jsonwebtoken")
secretkey = "secretkey"
const bcrypt = require("bcrypt");
const multer=require('multer')
const nodemailer = require('nodemailer');


//OTP generation
var digits = '0123456789';
let OTP = '';
for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'revathi@xponential.digital',
        pass: 'wlpoyvljmkogbqdj'
    }
});
function sendmail(toMail, otp) {
    const mailOptions = {
        from: 'revathi@xponential.digital',
        to: toMail,
        subject: 'New Account created',
        text: `There is your OTP : ${OTP}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}










//SIGN-UP TO GET OTP
const adduser = async (req, res) => {
    const password = await bcrypt.hash(req.body.Password, 6)
    try {

        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
            OTP: OTP
        }
        const data = await Users.query().insert(basic)
        sendmail(req.body.Email, OTP);
        res.status(200).send({ status: 200, message: "OTP sent please verify you're email" });

    }
    catch (err) {
        console.log("err", err)

    }

}


// COMPLETE SIGN-UP USING OTP VERIFICATION 
const successfullsign = async (req, res) => {
    
    try {
        let basic = {
            Email: req.body.Email,
             OTP: req.body.OTP
        }
        const user = await Users.query().findOne({
            Email: basic.Email,
            OTP: basic.OTP
        })
        console.log(user.OTP + OTP)
        if (OTP == user.OTP) {
            console.log(user.id)
            const user1 = await Users.query().findOne({
                Email: basic.Email,
            })
            console.log(user1)
            res.status(200).send({ status: 200, message: "OTP Verified",data:user1 });

        }
        else {
            res.status(403).send({ status: 403, message: "OTP Invalid" });

        }
    }
    catch (err){
        res.status(404).send(JSON.stringify("API response", err))

    }
}

//See all users who all are public
const getuser = async (req, res) => {
    try {
        const detail1 = await Users.query().where('block',null);
    //     let data=[{
    //     id:detail1.id,
    //     detail1.Email,
    //     detail1.Password,
    //     detail1.UserName,
    //     detail1.FirstName,
    //     detail1.LastName,
    //     detail1.Country,
    //     detail1.District,
    //     detail1.SSLCPercentage,
    //     detail1.SSLCPassedOutYear,
    //     detail1.HSCPercentage,
    //     detail1.HSCPassedOutYear,
    //     detail1.CollegePercentage,
    //     detail1.CollegePassedOutYear,
    //     detail1.WorkExperience,
    //     detail1.Jobsapplied,
    //     detail1.Job,
    //     detail1.Company
    // }]
       res.status(200).send({ status: 200, message: "Available users",data:detail1 });
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
}

// login to generate token 
const login = async (req, res) => {
    try {
        Email = req.body.Email;
        
        Password = req.body.Password;
        

        let result = await Users.query().findOne({
            Email: Email
        })
        if(result.Role=="user"){
            if (result) {
                const user = { Email: result.Email, Password: result.Password };
     
                 const token = jwt.sign(user, secretkey)
                 console.log("user", user)
                 console.log("token", token)
                 //return res.json({ token: token, result: result })
                 res.status(200).send({ status: 200, message: "Login success",token:token,result:result });
                }
     
             res.status(403).send({ status: 403, message: "Enter a valid Username and Password" });

        }
        else{
            if (result) {
                const user = { Email: result.Email, Password: result.Password };
     
                 const token = jwt.sign(user, secretkey)
                 console.log("user", user)
                 console.log("token", token)
                 res.status(200).send({ status: 200, message: "Logined as Admin",token:token,result:result });
                 
     
             }
     
             res.status(403).send({ status: 403, message: "Enter a valid Username and Password" });

        }
        


    }
    catch (err) {
        res.status(404).send(JSON.stringify("API response", err))
    }



}

//public or private
const public=async(req,res)=>{
    try{
        let id=req.body.id;
        

    const user = await Users.query().findById(id).update(req.body)

    res.status(200).send({ status: 200, message: "Private mode Enabled",data:user });

    }
    catch(err){
        res.status(404).send(JSON.stringify("API response"+err))

    }
    


}


// Update educational details

const profileupdate = async (req, res) => {
    try {
        let basic={
            
            Email:req.body.Email

        }
        let id=req.params.id
        
  
            const user = await Users.query().findById(id).update(req.body)

            res.status(200).send({ status: 200, message: "User Data Updated Successfully", data: user })

       


        

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}


// const emailverify = async (req, res) => {
//     const password = await bcrypt.hash(req.body.Password, 6)
//     try {

//         let basic = {
//             id:req.body.id,
//             Email: req.body.Email,
//             OTP: OTP
//         }
//         const data = await Users.query().findById(basic.id).update(req.body.OTP)
        
//         sendmail(req.body.Email, OTP);
//         res.status(200).send({ status: 200, message: "OTP sent please verify you're email" });

//     }
//     catch (err) {
//         console.log("err", err)

//     }

// }

// const emailsuccesschange = async (req, res) => {
//     const password = await bcrypt.hash(req.body.Password, 6)
//     try {

//         let basic = {
//             Email: req.body.Email,
//             OTP: OTP
//         }
        
//         sendmail(req.body.Email, OTP);
//         res.status(200).send({ status: 200, message: "OTP sent please verify you're email" });

//     }
//     catch (err) {
//         console.log("err", err)

//     }

// }











// incomplet 
// const connect = async (req, res) => {
//     try {

//         let Email=req.body.Email;

//         let result1 = await Users.query().findOne({ Email: Email });
//         result1.Connect=result1.Connect+1

//         if(result1.Public=="yes"){

//             let result = await Users.query().findOne({ Email: Email }).update(result1)
//             res.status(200).send({ status: 200, message: "User connected", data: result })

//         }
//         else{
//             res.status(200).send({ status: 200, message: "User is not public" })

//         }
        

        
        
        
//     }
//     catch (err) {
//         res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
//     }
// }

// const notification = async (req, res) => {

// }



const find = async (req, res) => {
    try {
        let Email = req.body.Email;
        let result = await Users.query().findOne({ Email: Email })
        res.status(200).send({ status: 200, message: "User Data Updated Successfully", data: result })



    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}


const block = async (req, res) => {
    try {
        let basic={
            id:req.body.id,
            block:req.body.block
        }
        
        let result = await Users.query().findById(basic.id).update(req.body)
        res.status(200).send({ status: 200, message: "User blocked Successfully", data: result })



    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}















module.exports = {
    adduser,
    getuser,
    login,
    profileupdate,
   
    find,
    successfullsign,
    public,
    block,
   
}