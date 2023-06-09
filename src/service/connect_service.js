const Users = require("../models/connect");

const finduser = async (params) => {
    return await Users.query().findOne(params)

}

const finduser_insert = async (param) => {
    return await Users.query().insert(param)

}

const finduser_where = async (param) => {
    return await Users.query().where(param)

}

const finduser_where2 = async (id) => {
    return await Users.query().where('personid', id).where('connect', 'connect')
}

const finduser_update = async (param1, param2) => {
    return await Users.query().findOne(param1).update(param2)

}
const usr_wheredel1 = async (param) => {
    return await Users.query().where({ personid: param }).delete()
}
const usr_wheredel11 = async (param) => {
    return await Users.query().where({ requestedto: param }).delete()
}
const usr_wheredel111 = async (param) => {
    return await Users.query().where({ connectedto: param }).delete()

}



module.exports = {
    finduser,
    finduser_insert,
    finduser_where,
    finduser_where2,
    finduser_update,
    usr_wheredel1,
    usr_wheredel11,
    usr_wheredel111

}