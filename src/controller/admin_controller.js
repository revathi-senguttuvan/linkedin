const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const post = require("../models/post");
const job = require("../models/job");
const connect = require("../models/connect");
const usr_src = require("../service/user_service");
const con_src = require("../service/connect_service");
const post_src = require("../service/post_service");
const job_src = require("../service/job_service");
const validate = require("../Helperfile/help.js");
const email = require("../Template/EmailFormat.js");




//mail generation
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
//addadmin
const addadmin = async (req, res) => {
    const password = await bcrypt.hash(req.body.Password, 6)
    try {
        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
            Role: req.body.Role,
            OTP: validate.otp()
        }
        const data = await usr_src.finduser_insert(basic)
        email.sendmail(req.body.Email, basic.OTP);
        res.status(200).send({ status: 200, message: "OTP sent please verify you're email" });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }
}

//verify
const successfullsign = async (req, res) => {
    try {
        console.log("shj")
        let basic = {
            Email: req.body.Email,
            OTP: req.body.OTP
        }
        const user = await usr_src.finduser2({
            Email: basic.Email,
            OTP: basic.OTP
        })
        console.log(user)
       
        if (basic.OTP == user.OTP) {
            const user1 = await usr_src.finduser({
                Email: basic.Email,
            })
            console.log(user1)
            res.status(200).send({ status: 200, message: "OTP Verified", data: user1 });
        }
        else {
            res.status(200).send({ status: 200, message: "OTP Invalid" });
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }
}

//deleteuser
const deltuser = async (req, res) => {
    try {
        let basic = {
            id: req.body.id,
            Email: req.body.Email
        }
        const finduser = await usr_src.finduser_where({ id: basic.id })
        console.log(finduser)
        if (finduser != 0) {
            const dltJobApplied = await job_src.job_wheredel(basic.Email )
            console.log(dltJobApplied)
            const dltPost = await post_src.usr_wheredel(basic.id )
            console.log(dltPost)
            const dltPersonID = await con_src.usr_wheredel1(basic.id )
            console.log(dltPersonID)
            const dltRequested = await con_src.usr_wheredel11( basic.id )
            console.log(dltRequested)
            const dltConnected = await con_src.usr_wheredel111(basic.id )
            console.log(dltConnected)
            const dltUser = await usr_src.usr_wheredel(basic.id )
            console.log(dltUser)
            res.status(200).send({ status: 200, message: "user has been deleted" });
        }
        else {
            res.status(404).send({ status: 404, message: "no such user" })

        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
       
    }
}

module.exports = {
    addadmin,
    successfullsign,
    deltuser
}