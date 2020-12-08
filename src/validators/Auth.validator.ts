import Joi,{ number, ObjectSchema } from 'joi'

export const registerStoreValidator:ObjectSchema=Joi.object({
    firstName:Joi.string().required(),
    lastName :Joi.string().required(),
    email: Joi.string().email().required(),
    businessName: Joi.string().required(),
    phone : Joi.string().optional()
})

export const createStorePasswordValidator:ObjectSchema=Joi.object({
    password:Joi.string().required(),
    token :Joi.string().required()
})


export const loginValidator:ObjectSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

