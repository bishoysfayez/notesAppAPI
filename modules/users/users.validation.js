import joi from "joi"



export const updatePasswordSchema = {
    body: joi.object().keys({
        oldPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,8}$')).required(),
        newPassword: joi.string().pattern(new RegExp('^[A-Za-z0-9]{3,8}$')).required(),
        newcPassword : joi.string().valid(joi.ref("newPassword")).required()    
    })
}

export const resetPasswordFromOTPSchema = {
    body: joi.object().keys({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        newPassword: joi.string().pattern(new RegExp('^[A-Za-z0-9]{3,8}$')).required(),
        newcPassword : joi.string().valid(joi.ref("newPassword")).required(),
        OTP : joi.string()
    })
}
export const getUserByIdSchema = {
    body: joi.object().keys({
        id: joi.string().required()
    })
}