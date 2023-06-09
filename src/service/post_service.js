const Users = require("../models/post");

const post_insert = async (param) => {
    return await Users.query().insert(param)

}

const post_where = async (param1, param2) => {
    return await Users.query().where(param1, param2)

}

const post_findone = async (params) => {
    return await Users.query().findOne(params)

}

const post_findone_del = async (params) => {
    return await Users.query().findOne(params).delete()

}
const postfind_id = async (params) => {
    return await Users.query().findById(params)

}
const postfind_idupd = async (params1, param2) => {
    return await Users.query().findById(params1).update(param2)

}
const usr_wheredel = async (param) => {
    return await Users.query().where({ users_id: param }).delete()

}




module.exports = {
    post_insert,
    post_where,
    post_findone,
    post_findone_del,
    postfind_id,
    postfind_idupd,
    usr_wheredel
}