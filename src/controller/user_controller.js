const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken")
const Users = require("../models/user");
const usr_ctrl = require("../service/user_service");
const validate = require("../Helperfile/help.js");
const email = require("../Template/EmailFormat.js");
let secretkey = process.env.secretkey


//sign-up to get otp
const adduser = async (req, res) => {
    const password = await bcrypt.hash(req.body.Password, 6)
    try {
        let basic = {
            Email: req.body.Email,
            Password: password,
            UserName: req.body.UserName,
            OTP: validate.otp()
        }
        const data = await usr_ctrl.finduser_insert(basic)
        email.sendmail(req.body.Email, basic.OTP);
       
        res.status(200).json(validate.structure( "your id" + " " + data.id, "OTP sent please verify you're email", 200));
    }
    catch (err) 
    {
        return res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}


//complete sign-up using otp verification 
const successfullsign = async (req, res) => {
    try {   
        let basic = {
            Email: req.body.Email,
            OTP: req.body.OTP
        }
        const user = await usr_ctrl.finduser({ Email: basic.Email, OTP: basic.OTP })
        console.log(basic.OTP == user.OTP)
        console.log(user.OTP)
        console.log(basic.OTP)
        if (basic.OTP == user.OTP) {
            console.log("ho")
            const user1 = await usr_ctrl.finduser_update({ Email: basic.Email },req.body)
            console.log(user1)

            res.status(200).json(validate.structure(null, "OTP Verified", 200));
        }
        else {
            res.status(200).json(validate.structure(null, "OTP Invalid", 200));
        }
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}

//See all users who all are public except blocked users
const getuser = async (req, res) => {
    try {
        const detail = await usr_ctrl.finduser_where('block', null);
        res.status(200).json(validate.structure(detail, "Available users", 200));
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
        

    }
}

// login to generate token 
const login = async (req, res) => {
    try {
        Email = req.body.Email;
        Password = req.body.Password;
        const token = jwt.sign(req.body, secretkey)
        res.status(200).json(validate.structure(token, "Login success", 200));
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}

//public or private
const public = async (req, res) => {
    try {
        let Email = req.body.Email;
        const user = await usr_ctrl.finduser_update({ Email: Email },req.body)
        res.status(200).json(validate.structure(null, "Private mode Enabled", 200));
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}

// Update educational details
const profileupdate = async (req, res) => {
    try {
        let basic = { Email: req.body.Email, OTP: validate.otp() }
        let id = req.params.id
        const user1 = await usr_ctrl.finduser_id(id)
        console.log(user1.Email)
        if (user1.Email == basic.Email) {
            const user = await usr_ctrl.finduser_idupd(id,req.body)
            res.status(200).json(validate.structure(req.body, "Updated Successfully", 200));
            }
        else {
            email.sendmail(req.body.Email, basic.OTP);
            let num = { OTP: basic.OTP }
            const user = await usr_ctrl.finduser_idupd(id,num)
            res.status(400).json(validate.structure(null, "mail has been changed ,please verify  mail before update", 400));
        }
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
        console.log(err)
    }
}

// update mail using otp
const verifyemailchange = async (req, res) => {
    
    try {
        console.log("hi")
        let basic = {
            id: req.body.id,
            OTP: req.body.OTP
        }
        const user = await usr_ctrl.finduser2({
            id: basic.id,
            OTP: basic.OTP
        })
      console.log(user)
        console.log(basic.OTP == user.OTP)
        if (basic.OTP == user.OTP) {
            console.log("hi")
            const user1 = await usr_ctrl.finduser_update({ id: basic.id },req.body)
             res.status(200).json(validate.structure(user1, "OTP Verified", 200));
        }
        else {
            res.status(400).json(validate.structure(null, "OTP Invalid", 400));
        }
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}


//find a specific user
const find = async (req, res) => {
    try {
        let Email = req.body.Email;
        let result = await usr_ctrl.finduser({ Email: Email })
         res.status(200).json(validate.structure(result, "User Detail", 200));
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}

//block a user
const block = async (req, res) => {
    try {
        let basic = {
            id: req.body.id,
            block: req.body.block
        }
        let result = await usr_ctrl.finduser_idupd(basic.id,req.body)
        res.status(200).json(validate.structure(result, "User blocked Successfully", 200));
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));
    }
}


//file storage
let extn;
let Email;

const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, cb) {
        cb(null, Email + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
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
                    id: Number(req.params.id),
                    profile: req.body.Email + new Date() + extn,
                }
                console.log(extn != null)
                if (extn != null) {
                    let result = await usr_ctrl.finduser_idupd(req.params.id ,basic)
                    res.status(200).json(validate.structure(basic, "image added Successfully", 200));
                }
                else {
                     res.status(200).json(validate.structure(null, "No image added", 200));
                    }
            }
        })
    }
    catch (err) {
        res.status(400).json(validate.structure(err, "Data not Updated", 400));

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
    verifyemailchange
}