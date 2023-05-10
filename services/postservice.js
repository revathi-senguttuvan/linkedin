const post=require("../models/post");

const addtext=async(req,res)=>{
    let basic={
        Text:req.body.Text,
        users_id:req.body.users_id
    }
    const data= await post.query().insert(basic)
    res.send(data)


}

const addjob=async(req,res)=>{

    let basic={
        JobTitle:req.body.JobTitle,
        JobPosition:req.body.JobPosition,
        Experince:req.body.Experince,
        Description:req.body.Description,
        users_id:req.body.users_id
    }
    
    const user= await post.query().findById(basic.users_id).update(basic)
    // if(users_id==)
    // const data= await post.query().insert(basic)
    res.status(200).send({ status: 200, message: "JOb Posted Successfully", data: user })


}








module.exports={
   addtext,
   addjob
}