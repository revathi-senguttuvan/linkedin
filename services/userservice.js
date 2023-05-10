const Users = require("../models/user");
const jwt = require("jsonwebtoken")
secretkey = "secretkey"
const bcrypt = require("bcrypt");
// const otp = require("generate-password")
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











const adduser = async (req, res) => {
    const password = await bcrypt.hash(req.body.Password, 6)
    try {
        // const otp1 = otp.generate({
        //     length: 6,
        //     symbols: false,
        //     uppercase: true
        // })
        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
        
            OTP:OTP
        }
       





        const data = await Users.query().insert(basic)
        sendmail(req.body.Email, OTP);
        // res.send(data)
        res.send("Please enter OTP for successfull signing-up")

    }
    catch (err) {
        console.log("err", err)

    }

}

const successfullsign=async(req,res)=>{
    const password = await bcrypt.hash(req.body.Password, 6)
    try{
        console.log("hi")
        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
            PhoneNumber: req.body.PhoneNumber,
            
            OTP:req.body.OTP
        }
        console.log(basic)

        
            
            const user = await Users.query().findOne({
                Email:basic.Email,
                OTP:basic.OTP
            })
            // console.log(OTP)
            //     console.log(user.OTP)
            //     console.log(OTP)
            console.log(user.OTP+OTP)
           
            if(OTP==user.OTP)
            {
                console.log(user.id)

                

            // const user1 = await Users.query().findOne({
            //     Email:user.Email})
            const user1 = await Users.query().findById(basic.Email)
          
        
            
            console.log(user1)
            res.send("updated")

        }
        else{
            res.status(403).send({ status: 403, message: "OTP Invalid" });
            
        }








    }
    catch{
        
    }
}


const getuser = async (req, res) => {
    try {
        // let Public=req.body.Public;

        const detail = await Users.query().where('Public', 'yes')
        res.status(200).send(detail)
    }
    catch (err) {
        res.status(404).send(JSON.stringify("API response", err))

    }
}


const login = async (req, res) => {
    try {
        // const id=req.body.id;
        Email = req.body.Email;
        console.log(Email)
        Password = req.body.Password;
        console.log(Password)
        


        let result = await Users.query().findOne({

            Email: Email,



        })


        console.log(result)
        if (result) {
            generateOTP();
            console.log(result)
            const user = { Email: result.Email, Password: result.Password };

            const token = jwt.sign(user, secretkey)
            console.log("user", user)
            console.log("token", token)
            return res.json({ token: token, result: result })
            // return res.send("ggd")

        }

        return res.json({ message: "please enter valid email and password" })


    }
    catch (err) {
        res.send(JSON.stringify(err))
    }



}


const profileupdate = async (req, res) => {
    try {
        let id = req.params.id

        const user = await Users.query().findById(id).update(req.body)

        res.status(200).send({ status: 200, message: "User Data Updated Successfully", data: user })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}

const connect = async (req, res) => {
    try {
        let Email = req.body.Email;
        let result = await Users.query().findOne({ Email: Email }).update(req.body)
        res.status(200).send({ status: 200, message: "User Data Updated Successfully", data: result })



    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}

const notification = async (req, res) => {

}



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







module.exports = {
    adduser,
    getuser,
    login,
    profileupdate,
    connect,
    find,
    successfullsign
}