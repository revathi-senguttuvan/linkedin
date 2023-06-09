const Users = require("../models/user");

const finduser = async(params1)=>
{
    return await Users.query().findOne(params1)

}
const finduser_update = async(param2,param3)=>
{
    return await Users.query().findOne(param2).update(param3)

}

const finduser_where = async(param4)=>
{
    return await Users.query().where(param4)

}

const finduser_insert = async(param5)=>
{
    return await Users.query().insert(param5)

}

const finduser_id = async(params1)=>
{
    return await Users.query().findById(params1)

}

const finduser_idupd = async(params1,param2)=>
{
    return await Users.query().findById(params1).update(param2)

}
const finduser2 = async(params1)=>
{
    return await Users.query().findOne(params1)

}
const usr_wheredel = async(param4)=>
{
    return  await Users.query().where({ id: param4 }).delete()

}





module.exports={ finduser,finduser_update,finduser_where,finduser_insert,finduser_id,
finduser_idupd,finduser2,usr_wheredel}