const job=require("../models/job");
const post=require("../models/post");
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
        text: `JOb Applicant detail: ${jobdetail.Email+"\n firstname:"+jobdetail.FirstName
        +"\n LastName:"+jobdetail.LastName+"\n Country:"+jobdetail.Country
        +"\n District:"+jobdetail.District
        +"\n SSLCPercentage:"+jobdetail.SSLCPercentage
        +"\n SSLCPassedOutYear:"+jobdetail.SSLCPassedOutYear
        +"\n SSLCPassedOutYear:"+jobdetail.HSCPercentage
        +"\n SSLCPassedOutYear:"+jobdetail.HSCPassedOutYear
        +"\n SSLCPassedOutYear:"+jobdetail.CollegePercentage
        +"\n SSLCPassedOutYear:"+jobdetail.CollegePassedOutYear
        +"\n SSLCPassedOutYear:"+jobdetail.CollegePassedOutYear
        +"\n WorkExperience:"+jobdetail.WorkExperience
        +"\n Job:"+jobdetail.Job
        +"\n Company:"+jobdetail.Company
    
    
    
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


const jobapplied=async(req,res)=>{
    try{
        let detail={
            users_id:req.body.users_id,
            post_id:req.body.post_id,
            Email:req.body.Email,
            Status:req.body.Status
    
        }
        const data=await job.query().insert(detail);
        users_id=detail.users_id
       
        
      
        
        const user1= await post.query().findById(detail.post_id)
        user1.no_of_persons=user1.no_of_persons+1
        console.log(user1.Email)

        const sendmsg=await Users.query().findById(detail.users_id)
        
        
        

        sendmail(user1.Email,sendmsg);
        console.log(sendmsg)
   

    const user= await post.query().findById(detail.post_id).update(user1)
        res.status(200).send({ status: 200, message: "Data added success!", data:data })


    }
    catch(err){
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
  

}

const getapplicantdetails=async(req,res)=>{
    let basic={
        post_id:req.body.post_id
        
    }
    const find= await job.query().where('post_id',req.body.post_id)
    res.status(200).send({ status: 200, message: "Data added success!", data:find })

}



module.exports={
    jobapplied,
    getapplicantdetails
}