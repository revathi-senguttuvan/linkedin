const connect = require("../models/connect.js");
const Users = require("../models/user.js");
const nodemailer = require('nodemailer');
const usr_src = require("../service/user_service.js");
const con_src = require("../service/connect_service.js");




//send mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'revathi@xponential.digital',
        pass: 'wlpoyvljmkogbqdj'
    }
});



function sendmail(toMail, jobdetail) {
    const mailOptions = {
        from: 'revathi@xponential.digital',
        to: toMail,
        subject: 'New Account created',
        text: `JOb Applicant detail: ${jobdetail.Email + "\n firstname:" + jobdetail.FirstName
            + "\n LastName:" + jobdetail.LastName + "\n Country:" + jobdetail.Country
            + "\n District:" + jobdetail.District
            + "\n SSLCPercentage:" + jobdetail.SSLCPercentage
            + "\n SSLCPassedOutYear:" + jobdetail.SSLCPassedOutYear
            + "\n SSLCPassedOutYear:" + jobdetail.HSCPercentage
            + "\n SSLCPassedOutYear:" + jobdetail.HSCPassedOutYear
            + "\n SSLCPassedOutYear:" + jobdetail.CollegePercentage
            + "\n SSLCPassedOutYear:" + jobdetail.CollegePassedOutYear
            + "\n SSLCPassedOutYear:" + jobdetail.CollegePassedOutYear
            + "\n WorkExperience:" + jobdetail.WorkExperience
            + "\n Job:" + jobdetail.Job
            + "\n Company:" + jobdetail.Company



            }`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


//connect request
const connect1 = async (req, res) => {
    try {
        let basic = {
            personid: req.body.personid,
            personmail: req.body.personmail,
            requestedto: req.body.requestedto,
            invitemail: req.body.invitemail,
            connect: req.body.connect,
        }
        const finduser1 = await usr_src.finduser({ id: basic.requestedto })
        let find_requested = await con_src.finduser({invitemail:basic.invitemail})
    
        if(find_requested==null&& finduser1.Email == basic.invitemail && finduser1.block == null && finduser1.Public == 'yes'){
            console.log("hi")
            const data = await con_src.finduser_insert(basic);
            const usr = await usr_src.finduser_id(basic.personid)
            const sendmsg = await usr_src.finduser_id(basic.requestedto)
            sendmail(basic.invitemail, usr);
            res.status(200).send({ status: 200, message: "successfully connected", data: data })

        }
        else {
            res.status(200).send({ status: 200, message: "User is not available" })

        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//connected person details 
const getconnect = async (req, res) => {
    try {
        let basic =
        {
            personid: req.body.personid
        }
        const find1 = await con_src.finduser_where2(req.body.personid)
        console.log(find1)
        console.log(req.body.personid)

        if (find1.length > 0) {
            const find = await con_src.finduser_where2(req.body.personid)
            res.status(200).send({ status: 200, message: "connect given persons", data: find })
        }
        else {
            res.status(200).send({ status: 200, message: "zero connect request" })
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//list of accepted people
const getaccept = async (req, res) => {
    try {
        let basic = {
            personid: req.body.personid
        }
        const find1 = await con_src.finduser_where('personid', req.body.personid)

        if (find1.length > 0) {
            const find = await con_src.finduser_where2(basic.personid)
            res.status(200).send({ status: 200, message: "List of accepted persons", data: find })
        }
        else {
            res.status(200).send({ status: 200, message: "You're not connected" })
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}


//accept the connect request
const accept = async (req, res) => {
    try {
        let basic =
        {
            personid:req.body.personid,
            requestedto: req.body.requestedto,
            accepted: req.body.accepted,
        }
        const data = await con_src.finduser({  personid: basic.personid })
        if(data!=null){
        data.connect = null;
        data.connectedto = data.requestedto
        data.requestedto = null;
        data.accepted = basic.accepted;
        const fild = await con_src.finduser_update({ personid: basic.personid },data)
        const fild2 = await con_src.finduser_update({ personid: basic.personid },req.body)
        res.status(200).send({ status: 200, message: "Data added success!", data: fild })
        }
        else{
            res.status(200).send({ status: 200, message: "no such user found", data: null})

        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//reject a connect request
const reject = async (req, res) => {
    try {
        let basic = {
            personid:req.body.personid,
            requestedto: req.body.requestedto,
            rejected: req.body.rejected,
        }
        const data = await con_src.finduser({ personid: basic.personid })
        if(data!=null){
        data.connect = null;
        data.rejected = basic.rejected;
        const fild = await con_src.finduser_update({ personid: basic.personid},data)
        const fild2 = await con_src.finduser_update({ personid: basic.personid },req.body)
        res.status(200).send({ status: 200, message: "Data added success!", data: fild })
        }
        else{
            res.status(200).send({ status: 200, message: "no such user found", data: null})

        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//reconnect with a person
const reconnect = async (req, res) => {
    try {
        let basic = {
            requestedto: req.body.requestedto,
            connect: req.body.connect,
            invitemail: req.body.invitemail
        }
        const data = await con_src.finduser({ requestedto: basic.requestedto })
        if (data.invitemail == basic.invitemail) {
            data.rejected = null;
            data.connect = basic.connect;
            const fild = await con_src.finduser_update({ requestedto: basic.requestedto },data)
            res.status(200).send({ status: 200, message: "Data added success!", data: fild })
        }
        res.status(200).send({ status: 200, message: "not added" })
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

module.exports = {
    connect1,
    getconnect,
    accept,
    reject,
    reconnect,
    getaccept
}