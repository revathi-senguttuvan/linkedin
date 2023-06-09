const Joi = require('joi')
function structure(data, message, status) {
    return { status, message, data }
}

const update_validation = async (req, res, next) => {

    const CreateJoi = Joi.object({
        id: Joi.number(),
        Email: Joi.string(),
        Password: Joi.string(),
        UserName: Joi.string(),
        FirstName: Joi.string(),
        LastName: Joi.string(),
        Country: Joi.string(),
        District: Joi.string(),
        Public: Joi.string(),
        PhoneNumber: Joi.number(),
        SSLCPercentage: Joi.number(),
        SSLCPassedOutYear: Joi.number(),
        HSCPercentage: Joi.number(),
        HSCPassedOutYear: Joi.number(),
        CollegePercentage: Joi.number(),
        CollegePassedOutYear: Joi.number(),
        WorkExperience: Joi.number(),
        Job: Joi.string(),
        Company: Joi.string(),
        Role: Joi.string(),
        Connect: Joi.string(),
        block: Joi.string(),
        OTP:Joi.number()

    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).json(structure(validation.error.details[0].message, "Validation Error", 400));
    }
    next();

}

const post_validation = async (req, res, next) => {

    const CreateJoi = Joi.object({
        id: Joi.number(),
        users_id: Joi.number(),
        Text: Joi.string(),
        JobTitle: Joi.string(),
        JobPosition: Joi.number(),
        Experience: Joi.number(),
        Description: Joi.string(),
        link: Joi.string(),
        image: Joi.string(),
        no_of_persons: Joi.number(),
        Email: Joi.string(),
      

    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).json(structure(validation.error.details[0].message, "Validation Error", 400));
    }
    next();

}
const job_validation = async (req, res, next) => {

    const CreateJoi = Joi.object({
        id: Joi.number(),
        users_id: Joi.number(),
        post_id: Joi.number(),
        Email: Joi.string(),
        Status: Joi.string(),
        ownermail: Joi.string()
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).json(structure(validation.error.details[0].message, "Validation Error", 400));
    }
    next();
}


const connect_validation = async (req, res, next) => {

    const CreateJoi = Joi.object({
        id: Joi.number(),
        personid: Joi.number(),
        connectedto: Joi.number(),
        requestedto: Joi.number(),
        personmail: Joi.string(),
        invitemail: Joi.string(),
        accepted: Joi.string(),
        rejected: Joi.string(),
        connect:Joi.string()
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).json(structure(validation.error.details[0].message, "Validation Error", 400));
    }
    next();
}





module.exports = { update_validation, post_validation ,job_validation,connect_validation}