

import joi from 'joi'

export const signUpSchema = {
    body: joi
      .object()
      .required()
      .keys({
        userName: joi.string().min(4).max(10).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,8}$')).required(),
        cPassword : joi.string().valid(joi.ref("password")).required(),
        age: joi.number(),
        phone: joi.string().pattern(new RegExp('^[0-9]{3,12}$')),
        profilePic : joi.string()
      })};



export const signInSchema = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,8}$')).required(),
      
    })};



