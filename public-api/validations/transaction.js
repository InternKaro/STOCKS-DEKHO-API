const Joi = require("joi");

const reviewBuyBody = Joi.object({
    userId: Joi.string().required(),
    stockSymbol: Joi.string().required(),
    quantity: Joi.number().positive().integer()
});
module.exports = {
    reviewBuyBody,
}