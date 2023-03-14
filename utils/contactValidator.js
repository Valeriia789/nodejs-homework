const Joi = require("joi");

const createContactDataValidator = (data) =>
  Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(16).required(),
  }).validate(data);

module.exports = createContactDataValidator;
