import Joi,{  ObjectSchema } from 'joi'

export const createClassValidator:ObjectSchema=Joi.object({
    title:Joi.string().required(),
    startTime :Joi.string().required(),
    endTime: Joi.string().required(),
    price: Joi.number().required(),
})
