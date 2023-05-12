const post = require("../models/post");
const multer = require('multer')


const addtext = async (req, res) => {
    try {
        let basic = {
            Text: req.body.Text,
            users_id: req.body.users_id
        }
        const data = await post.query().insert(basic)
        res.status(200).send({ status: 200, message: "Text added Successfully", data: data })

    }
    catch (err) {
        res.status(404).send(JSON.stringify("API response", err))

    }



}

const link = async (req, res) => {
    try {
        let basic = {

            link: req.body.link,
            users_id: req.body.users_id
        }
        const data = await post.query().insert(basic)
        res.status(200).send({ status: 200, message: "Link added Successfully", data: data })

    }
    catch (err) {
        res.status(404).send(JSON.stringify("API response", err))

    }


}

// let statusname;
// let name;
// let extn;

// const storage = multer.diskStorage({
//     destination: 'images',
//     filename: function (req, file, cb) {
//         cb(null, "image" + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
//         extn = path.extname(file.originalname)
//     }
// })
// const maxSize = 2 * 1000 * 1000;
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: maxSize },
//     fileFilter: function (req, file, callb) {
//         const filetypes = /jpeg|jpg|png|pdf|/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname1 = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname1) {
//             return callb(null, true);
//         }
//         callb("Uploaded file not similar to JPEG,JPG PNG,PDF")
//     }
// }).single('myimage')





// const upload=multer({storage:filestorageEngine});

// app.post("/single",upload.single("image2"),(req,res)=>{
//     console.log(req.file); 
//     res.send("single file upload success")
// })
let statusname;
        let name;
        let extn;

        const storage = multer.diskStorage({
            destination: 'images',
            filename: function (req, file, cb) {
                cb(null, "images" + new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
                extn = path.extname(file.originalname)
            }
        })
        const maxSize = 2 * 1000 * 1000;
        // const upload=multer({storage:filestorageEngine});
        const upload = multer({
            storage: storage,
            limits: { fileSize: maxSize },
            fileFilter: function (req, file, callb) {
                const filetypes = /jpeg|jpg|png|pdf|/;
                const mimetype = filetypes.test(file.mimetype);
                // const extname1 = filetypes.test(path.extname(file.originalname).toLowerCase());
                // if (mimetype && extname1) {
                //     return callb(null, true);
                // }
                // callb("Uploaded file not similar to JPEG,JPG PNG,PDF")
            }
        }).single('image')






const image = async (req, res) => {


    try {

        
      
        upload(req, res, async function (err) {
            if (err) {
                res.send(err);
            }
            else{
                let basic ={
                    users_id: req.body.users_id,
                    image: "revathi" + new Date() + extn
                }
                const data = await post.query().insert(basic)
        res.status(200).send({ status: 200, message: "image added Successfully", data: data })

            
                
            }
        })

        

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })

    }


}




















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





const getjob = async (req, res) => {



    const user = await post.query();
    // if(users_id==)
    // const data= await post.query().insert(basic)
    res.status(200).send({ status: 200, message: "JOb Posted Successfully", data: user })


}

const applyjob = async (req, res) => {

    let id = req.body.id



    const user1 = await post.query().findById(id)
    user1.no_of_persons = user1.no_of_persons + 1


    const user = await post.query().findById(id).update(user1)
    res.status(200).send({ status: 200, message: "JOb Posted Successfully", data: user })


}








module.exports = {
    addtext,
    addjob,
    getjob,
    applyjob,
    link,
    image
}