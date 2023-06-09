const multer = require('multer');
const path = require('path');
var validUrl = require('valid-url');
const post = require("../models/post");
const job = require("../models/job");
const post_ctrl = require("../service/post_service");
const job_src = require("../service/job_service");


//post text
const addtext = async (req, res) => {
    try {
        let basic = {
            Text: req.body.Text,
            users_id: req.body.users_id
        }
        if (basic.Text != '') {
            const data = await post_ctrl.post_insert(basic)
            res.status(200).send({ status: 200, message: "Text added Successfully", data: data })
        }
        else {
            res.status(204).send({ status: 204, message: "Please  add some text" })
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//post link
const link = async (req, res) => {
    try {
        let basic = {
            link: req.body.link,
            users_id: req.body.users_id
        }
        var validUrl = require('valid-url');
        if (validUrl.isUri(basic.link)) {
            if (basic.link != '') {
                const data = await post_ctrl.post_insert(basic)
                res.status(200).send({ status: 200, message: "Link added Successfully", data: data })
            }
            else {
                res.status(204).send({ status: 204, message: "Please  add some link" })
            }
        } else {
            res.status(400).send({ status: 400, message: "It's not an link" })
            console.log('Not a URI');
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })
    }
}

//post image
let extn;


const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
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
                    users_id: req.body.users_id,
                    image: req.body.users_id + new Date() + extn
                }
                if (extn != null) {
                    const data = await post_ctrl.post_insert(basic)
                    res.status(200).send({ status: 200, message: "image added Successfully", data: data })
                }
                else {
                    res.status(204).send({ status: 204, message: "No image added " })
                }
            }
        })
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }
}

//post everything
const uploadall = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                res.send(err);
            }
            else {
                let basic = {
                    Text: req.body.Text,
                    link: req.body.link,
                    users_id: req.body.users_id,
                    image: new Date() + extn
                }
                if (extn != null) {
                    if (validUrl.isUri(basic.link)) {
                        const data = await post_ctrl.post_insert(basic)
                        res.status(200).send({ status: 200, message: "image added Successfully", data: data })
                    }
                    else {
                        res.status(400).send({ status: 400, message: "It's not an link" })
                    }
                }
                else {
                    res.status(204).send({ status: 204, message: "no image added" })
                }
            }
        })
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }

}


const postdetail = async (req, res) => {
    let users_id = req.body.users_id
    const user = await post_ctrl.post_where("users_id", users_id)
    res.status(200).send({ status: 200, message: "post detail", data: user })
}


//Post a job
const addjob = async (req, res) => {
    try {
        let basic = {
            JobTitle: req.body.JobTitle,
            JobPosition: req.body.JobPosition,
            Experince: req.body.Experince,
            Description: req.body.Description,
            users_id: req.body.users_id,
            Email: req.body.Email
        }
        const data = await post_ctrl.post_insert(basic)
        res.status(200).send({ status: 200, message: "JOb Posted Successfully", data: data })

    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }
}

// Get all the jobs
const getjob = async (req, res) => {
    try{
    const user = await post.query().where('JobTitle', '!=', '');
    res.status(200).send({ status: 200, message: "Job dtails", data: user })
    }
    catch(err){
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

    }
}

const deletepost = async (req, res) => {
try{
   let basic = {
    users_id: req.body.users_id,
    id: req.body.id
    }
    const userdetail = await post_ctrl.post_findone({id:basic.id})
    console.log(userdetail)
    console.log(userdetail.users_id==basic.users_id )
   if(userdetail.users_id==basic.users_id )
   {
    // const jobdetail = await job_src.job_findone({"post_id":basic.id})
    const jobdetail = await job.query()
    console.log(jobdetail)
    if(jobdetail.post_id==null){
        console.log("hi")
        const userdetail = await post_ctrl.post_findone_del({id:basic.id});
        res.status(200).send({ status: 200, message: "post deleted", data: null })
    }
    else{
        console.log("hi")
        const jobdetail = await job_src.job_findone_del({post_id:basic.id});
        const userdetail = await post_ctrl.post_findone_del({id:basic.id});
        res.status(200).send({ status: 200, message: "post deleted", data: null })
     }
   
   }
   else{
    res.status(200).send({ status: 200, message: "you're not allowed to delete this post", data: user })

   }
}
catch(err){
    res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err })

}
   

   
}




module.exports = {
    addtext,
    addjob,
    getjob,
    link,
    image,
    uploadall,
    postdetail,
    deletepost

}