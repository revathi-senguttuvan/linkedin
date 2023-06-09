const Users = require("../models/connect");

const finduser = async (params1) => {
    return await Users.query().findOne(params1)

}

const finduser_insert = async (param5) => {
    return await Users.query().insert(param5)

}

const finduser_where = async (param4) => {
    return await Users.query().where(param4)

}

const finduser_where2 = async (id) => {
    return await Users.query().where('personid', id).where('connect', 'connect')
}

const finduser_update = async (param2, param3) => {
    return await Users.query().findOne(param2).update(param3)

}
const usr_wheredel1 = async (param4) => {
    return await Users.query().where({ personid: param4 }).delete()
}
const usr_wheredel11 = async (param4) => {
    return await Users.query().where({ requestedto: param4 }).delete()
}
const usr_wheredel111 = async (param4) => {
    return await Users.query().where({ connectedto: param4 }).delete()

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