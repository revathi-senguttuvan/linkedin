const Users = require("../models/user");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

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


const addadmin = async (req, res) => {
    const password = await bcrypt.hash(req.body.Password, 6)
    try {

        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
            Role:req.body.Role,
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





module.exports={
    addadmin,
    successfullsign
}