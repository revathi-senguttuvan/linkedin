const Users=require("../models/post");

const adduser=async(req,res)=>{
    let basic={
        Text:req.body.Text,
    }
    const data= await Users.query().insert(basic)
    res.send(data)


}



module.exports={
   adduser
}