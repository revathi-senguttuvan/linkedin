const post = require("../models/post");
const multer = require('multer');
const path = require('path');
var validUrl = require('valid-url');



//post text
const addtext = async (req, res) => {
    try {
        let basic = {
            Text: req.body.Text,
            users_id: req.body.users_id
        }
        if (basic.Text != '') {
            const data = await post.query().insert(basic)
            res.status(200).send({ status: 200, message: "Text added Successfully", data: data })

        }
        else {
            res.status(200).send({ status: 200, message: "Please  add some text" })

        }


    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })



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
            console.log('Looks like an URI');

            if (basic.link != '') {
                const data = await post.query().insert(basic)
                res.status(200).send({ status: 200, message: "Link added Successfully", data: data })
            }
            else {
                res.status(200).send({ status: 200, message: "Please  add some link" })

            }
        } else {
            res.status(404).send({ status: 404, message: "It's not an link" })
            console.log('Not a URI');
        }


    }
    catch (err) {
        res.status(404).send(JSON.stringify("API response", err))

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
                    users_id:req.body.users_id,
                    
                    image: req.body.users_id+new Date() + extn
                }
                if (extn != null) {
                    const data = await post.query().insert(basic)
                    res.status(200).send({ status: 200, message: "image added Successfully", data: data })

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


                if (basic.link != '') {
                    if (validUrl.isUri(basic.link)) {
                        if (basic.Text != '') {
                            if (extn != null) {
                                const data = await post.query().insert(basic)
                                res.status(200).send({ status: 200, message: "image added Successfully", data: data })
                            }
                            else {
                                console.log(basic.image.extn != null)
                                console.log(extn)
                                res.status(404).send({ status: 404, message: "No image added" })


                            }

                        }
                        else {
                            res.status(404).send({ status: 404, message: " please add some text" })

                        }
                    }
                    else {
                        res.status(404).send({ status: 404, message: "It's not an link" })
                        console.log('Not a URI');

                    }
                } else {
                    res.status(404).send({ status: 404, message: "please add some link " })
                }

            }
        })

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }

}


const postdetail = async (req, res) => {
    let users_id=req.body.users_id
    

    const user = await post.query().where("users_id",users_id)
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



        const data = await post.query().insert(basic)
        res.status(200).send({ status: 200, message: "JOb Posted Successfully", data: data })

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }




}




// Get all the jobs
const getjob = async (req, res) => {
    const user = await post.query().where('JobTitle','!=','');
    res.status(200).send({ status: 200, message: "Job dtails", data: user })
}

const deletepost = async (req, res) => {
   let basic = {
       
        users_id: req.body.users_id
    }

    const userdetail = await post.query().findOne({users_id:basic.users_id}).delete()
   // if(users_id==userdetail.users_id )
   console.log(userdetail)
   console.log(basic.users_id)

    const user = await post.query().where('JobTitle',null)
    console.log(user)
  
    console.log(user.users_id)

    res.status(200).send({ status: 200, message: "Job dtails", data: user })
}

const deletejob = async (req, res) => {

    const user = await post.query().where('JobTitle','!=','').delete();
    console.log(user)
    res.status(200).send({ status: 200, message: "Successfully deleted"})
}


module.exports = {
    addtext,
    addjob,
    getjob,
    link,
    image,
    uploadall,
    postdetail,
    deletepost,
    deletejob
}