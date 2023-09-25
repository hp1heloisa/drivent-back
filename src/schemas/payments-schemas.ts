import Joi from "joi";

export const payTicketSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: Joi.object({
        issuer: Joi.string().valid('VISA', 'MASTERCARD').required(),
        number: Joi.string().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string().isoDate().required(),
        cvv: Joi.string().required()
    }).required()
})
