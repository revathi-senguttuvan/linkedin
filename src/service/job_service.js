const Users = require("../models/job");

const job_findone = async(params1)=>
{
    return await Users.query().findOne(params1)

}

const job_findone_del = async(params1)=>
{
    return await Users.query().findOne(params1).delete()

}

const job_insert = async(param5)=>
{
    return await Users.query().insert(param5)

}

const job_where = async(param4)=>
{
    return await Users.query().where(param4)

}

const job_wheredel = async(param4)=>
{
    return  await Users.query().where({ ownermail: param4}).delete()

}

module.exports={
    job_findone,
    job_findone_del,
    job_insert,
    job_where,
    job_wheredel
}