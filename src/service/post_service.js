const Users = require("../models/post");

const post_insert = async(param5)=>
{
    return await Users.query().insert(param5)

}

const post_where = async(param4,param5)=>
{
    return await Users.query().where(param4,param5)

}

const post_findone = async(params1)=>
{
    return await Users.query().findOne(params1)

}

const post_findone_del = async(params1)=>
{
    return await Users.query().findOne(params1).delete()

}
const postfind_id = async(params1)=>
{
    return await Users.query().findById(params1)

}
const postfind_idupd = async(params1,param2)=>
{
    return await Users.query().findById(params1).update(param2)

}
const usr_wheredel = async(param4)=>
{
    return  await Users.query().where({ users_id: param4 }).delete()

}




module.exports={
    post_insert,
    post_where,
    post_findone,
    post_findone_del,
    postfind_id,
    postfind_idupd,
    usr_wheredel
}