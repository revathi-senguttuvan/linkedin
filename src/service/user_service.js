const Users = require("../models/user");

const finduser = async (params) => {
    return await Users.query().findOne(params)

}
const finduser_update = async (param1, param2) => {
    return await Users.query().findOne(param1).update(param2)

}

const finduser_where = async (param) => {
    return await Users.query().where(param)

}

const finduser_insert = async (param) => {
    return await Users.query().insert(param)

}

const finduser_id = async (params) => {
    return await Users.query().findById(params)

}

const finduser_idupd = async (params1, param2) => {
    return await Users.query().findById(params1).update(param2)

}
const finduser2 = async (params) => {
    return await Users.query().findOne(params)

}
const usr_wheredel = async (param) => {
    return await Users.query().where({ id: param }).delete()

}





module.exports = {
    finduser, finduser_update, finduser_where, finduser_insert, finduser_id,
    finduser_idupd, finduser2, usr_wheredel
}