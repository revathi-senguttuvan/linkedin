const Users = require("../models/user");
const jwt = require("jsonwebtoken")
secretkey = "secretkey"
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const { Console, profile } = require("console");


//OTP generation
var digits = '0123456789';
let OTP = '';
for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
}


//send email
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
           
            OTP: OTP
        }
        const data = await Users.query().insert(basic)
        sendmail(req.body.Email, OTP);
        res.status(200).send({ status: 200, message: "OTP sent please verify you're email",data:"your id"+" "+data.id });

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

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
            }).update(req.body)
            console.log(user1)
            res.status(200).send({ status: 200, message: "OTP Verified",data:user1 });

        }
        else {
            res.status(403).send({ status: 403, message: "OTP Invalid" });

        }
    }
    catch (err){
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
}

//See all users who all are public except blocked users
const getuser = async (req, res) => {
    try {
        const detail1 = await Users.query().where('block',null);
        res.status(200).send({ status: 200, message: "Available users",data:detail1});
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
}

// login to generate token 
const login = async (req, res) => 
{
    try {
        Email = req.body.Email;
        
        Password = req.body.Password;
    
                const token = jwt.sign(req.body, secretkey)
                 res.status(200).send({ status: 200, message: "Login success",token:token });
                
     }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }



}

//public or private
const public=async(req,res)=>{
    try{
        let Email=req.body.Email;
        

    const user = await Users.query().findOne({Email:Email}).update(req.body)

    res.status(200).send({ status: 200, message: "Private mode Enabled"});

    }
    catch(err){
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
    


}


// Update educational details

const profileupdate = async (req, res) => {
    try {
        let basic={Email:req.body.Email,OTP: OTP}
        let id=req.params.id
        const user1 = await Users.query().findById(id)
        

        if(user1.Email==basic.Email){
            const user = await Users.query().findById(id).update(req.body)
         
           

            res.status(200).send({ status: 200, message: "Updated Successfully", data: req.body})

        }
        else{
            sendmail(req.body.Email, OTP);
            console.log(OTP)
            let num={OTP:OTP}
            const user = await Users.query().findById(id).update(num)
           
             res.status(404).send({ status: 404, message: "mail has been changed ,please verify  mail before update"})

        }
}
    catch (err) {
      
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}

// COMPLETE SIGN-UP USING OTP VERIFICATION 
const vryemailchange = async (req, res) => {
    
    try {
        let basic = {
            
            id: req.body.id,
             OTP: req.body.OTP
        }
        const user = await Users.query().findOne({
            id: basic.id,
            OTP: basic.OTP
        })
        console.log(user.OTP + OTP)
        if (OTP == user.OTP) {
            console.log(user.id)
            const user1 = await Users.query().findOne({
                id: basic.id,
            }).update(req.body)
            console.log(user1)
            res.status(200).send({ status: 200, message: "OTP Verified",data:user1 });

        }
        else {
            res.status(403).send({ status: 403, message: "OTP Invalid" });

        }
    }
    catch (err){
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }
}




//find specific user
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


//block a user
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



//file storage
let extn;
let Email;


const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, cb) {
        cb(null, Email+new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
        extn = path.extname(file.originalname)
    }
})
const maxSize = 100000 * 1000 * 1000;
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, callb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname1 = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname1) {
            return callb(null, true);
        }
        callb(structure(null, "Uploaded file not similar to JPEG,JPG PNG,PDF", 404))
    }
}).single('myimage')


const image = async (req, res) => {


    try {



        upload(req, res, async function (err) {
            if (err) {
                res.send(err);
            }
            else {
                let basic = {
                    id:Number(req.params.id),
                    
                    profile: req.body.Email +new Date() + extn,
                    
                }
                console.log(basic)
                if (extn != null) {
                    let result = await Users.query().findOne({id:req.params.id}).update(basic)
                    res.status(200).send({ status: 200, message: "image added Successfully", data:basic})

                }
                else {
                    res.status(404).send({ status: 404, message: "No image added " })


                }
            }
        })
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
    image,
    find,
    successfullsign,
    public,
    block,
    vryemailchange
   
}