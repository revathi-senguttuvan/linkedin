const job = require("../models/job");
const post = require("../models/post");
const Users = require("../models/user");
const nodemailer = require('nodemailer');
const post_src = require("../service/post_service");
const job_src = require("../service/job_service");
const usr_src = require("../service/user_service");

//send email
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

//apply for a job and send applicant details through mail
const jobapplied = async (req, res) => {
    try {
        let detail = {
            users_id: req.body.users_id,
            post_id: req.body.post_id,
            Email: req.body.Email,
            ownermail: req.body.ownermail,
            Status: req.body.Status
        }
        const user2 = await post_src.postfind_id(detail.post_id)
        const find = await job.query()

        if (find.post_id == '')// check for post equal to null
        {
            const data = await job_src.job_insert(detail);
            users_id = detail.users_id

            const user1 = await post_src.postfind_id(detail.post_id)
            user1.no_of_persons = user1.no_of_persons + 1


            const sendmsg = await usr_src.finduser_id(detail.users_id)
            sendmail(user1.Email, sendmsg);

            const user = await post_src.postfind_idupd(detail.post_id,user1)
            res.status(200).send({ status: 200, message: "Data added success!", data: data })
        }
        else {//if post already exist
            if (user2.users_id != detail.users_id) //checks the applicant userid and  post user id not same
            {
                if (find.Email != detail.Email)//checks for the user who as already applied using email
                {
                    if (user2.JobPosition != user2.no_of_persons) //checks for openings 
                    {
                        const data = await job_src.job_insert(detail);
                        users_id = detail.users_id

                        const user1 = await post_src.postfind_id(detail.post_id)
                        user1.no_of_persons = user1.no_of_persons + 1


                        const sendmsg = await usr_src.finduser_id(detail.users_id)
                        sendmail(user1.Email, sendmsg);

                        const user = await post_src.postfind_idupd(detail.post_id,user1)
                        res.status(200).send({ status: 200, message: "Data added success!", data: data })
                    }
                    else {
                        res.status(200).send({ status: 200, message: "Opening's are closed" })

                    }
                }
                else {
                    res.status(200).send({ status: 200, message: "Already applied" })

                }
            }
            else {
                res.status(200).send({ status: 200, message: "Invalid inputs" })}
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}


//get applicants details from the job_postid
const getapplicantdetails = async (req, res) => {
    let basic = {
        post_id: req.body.post_id
     }
    const find = await job_src.job_where('post_id', req.body.post_id)
    
    res.status(200).send({ status: 200, message: "Data added success!", data: find })

}




module.exports = {
    jobapplied,
    getapplicantdetails
}