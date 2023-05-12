const connect = require("../models/connect.js");
const Users = require("../models/user");
const nodemailer = require('nodemailer');


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



const connect1 = async (req, res) => {
    try {
        let basic = {
            personid: req.body.personid,
            personmail: req.body.personmail,
            requestedto: req.body.requestedto,
            invitemail: req.body.invitemail,
            connect: req.body.connect,
        }
        const blockeduser1 = await Users.query().findOne({ Email: basic.invitemail })
        if (blockeduser1.Email == basic.invitemail) {
            if (blockeduser1.block == null) {
                if (blockeduser1.Public == 'yes') 
                {
                    const data = await connect.query().insert(basic);
                    const usr = await Users.query().findById(basic.personid)
                    console.log(usr.Email)

                    const sendmsg = await Users.query().findById(basic.requestedto)
                    console.log(sendmsg)


                    sendmail(usr.Email, sendmsg);

                    console.log(data)
                    res.status(200).send({ status: 200, message: "Data added success!", data: data })


                }
                else{
                    res.status(404).send({ status: 404, message: "User is not available" })

                }

            }



        }
        else {
            res.status(404).send({ status: 404, message: "User is not available" })

        }







    }
    catch (err) {
        // res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
        console.log(err)

    }




}

const getconnect = async (req, res) => {
    let basic = {
       
        personid:req.body.personid

    }
    const find = await connect.query().findOne({personid:basic.personid}).where('connect', 'connect')
    res.status(200).send({ status: 200, message: "connect given persons", data: find })

}


const getaccept = async (req, res) => {
    let basic = {
       
        personid:req.body.personid

    }
    // const find1= await connect.query().findOne({personid:basic.personid})
    // if(find1.accept=="accept")
    const find = await connect.query().findOne({personid:basic.personid}).where('accepted', 'accept')
    res.status(200).send({ status: 200, message: "List of accepted persons", data: find })

}


const accept = async (req, res) => {
    try {
        let basic = {
            requestedto: req.body.requestedto,

            accepted: req.body.accepted,

        }
        const data = await connect.query().findOne({
            requestedto: basic.requestedto

        })
        console.log(data)
        data.connect = null;
        
        data.connectedto=data.requestedto
        data.requestedto=null;
        data.accepted=basic.accepted;
        const fild = await connect.query().findOne({
            requestedto: basic.requestedto

        }).update(data)
        const fild2 = await connect.query().findOne({
            requestedto: basic.requestedto

        }).update(req.body)
        res.status(200).send({ status: 200, message: "Data added success!", data: fild })


        // const find1= await connect.query().findOne({
        //     requestedto:basic.requestedto

        // })
        // console.log(find1)
        // find1.connect=''
        // if(find1.accepted=="accept"){
        //     let basic={
        //         connect:""

        //     }

        //     const up= await connect.query().findOne({
        //         requestedto:basic.requestedto

        //     }).update(basic);
        //     console.log(up)

        //     res.status(200).send({ status: 200, message: "Data added success!", data:up })


        // }
        // else{
        //     res.status(404).send({ status: 404, message: "Data not added!"})

        // }

    }
    catch (err) {
        // res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
        console.log(err)

    }




}

const reject = async (req, res) => {
    try {
        let basic = {
            requestedto: req.body.requestedto,

            rejected: req.body.rejected,

        }
        const data = await connect.query().findOne({
            requestedto: basic.requestedto})
        console.log(data)
        data.connect = null;
        
        data.rejected=basic.rejected;
        const fild = await connect.query().findOne({
            requestedto: basic.requestedto

        }).update(data)
        const fild2 = await connect.query().findOne({
            requestedto: basic.requestedto

        }).update(req.body)
        res.status(200).send({ status: 200, message: "Data added success!", data: fild })


       

    }
    catch (err) {
       
        console.log(err)

    }

}

const reconnect = async (req, res) => {
    try {
        let basic = {
            requestedto: req.body.requestedto,

            connect: req.body.connect,
            invitemail:req.body.invitemail

        }
        const data = await connect.query().findOne({
            requestedto: basic.requestedto})
        console.log(data)
        
        if(data.invitemail==basic.invitemail){
            data.rejected = null;
            data.connect = basic.connect;
            const fild = await connect.query().findOne({
                requestedto: basic.requestedto
    
            }).update(data)
            res.status(200).send({ status: 200, message: "Data added success!", data: fild })


        }
        res.status(200).send({ status: 200, message: "not added"})
       
        
        
        // const fild = await connect.query().findOne({
        //     requestedto: basic.requestedto

        // }).update(data)
        // const fild2 = await connect.query().findOne({
        //     requestedto: basic.requestedto

        // }).update(req.body)
        


       

    }
    catch (err) {
       
        console.log(err)

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