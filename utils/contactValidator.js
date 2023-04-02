const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(20).alphanum().required(),
      email: Joi.string().email(),
      phone: Joi.string().min(6).max(26).required(),
      favorite: Joi.boolean(),
      desk: Joi.string().max(1000),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(20),
      email: Joi.string().email(),
      phone: Joi.string().min(6).max(26),
      favorite: Joi.boolean().required(),
      desk: Joi.string().max(1000),
    })
    .validate(data);
