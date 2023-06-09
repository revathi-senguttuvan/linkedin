const Users = require("../models/job");

const job_findone = async (params) => {
    return await Users.query().findOne(params)

}

const job_findone_del = async (params) => {
    return await Users.query().findOne(params).delete()

}

const job_insert = async (param) => {
    return await Users.query().insert(param)

}

const job_where = async (param) => {
    return await Users.query().where(param)

}

const job_wheredel = async (param) => {
    return await Users.query().where({ ownermail: param }).delete()

}

module.exports = {
    job_findone,
    job_findone_del,
    job_insert,
    job_where,
    job_wheredel
}