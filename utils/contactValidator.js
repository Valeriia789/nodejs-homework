const Joi = require("joi");

const contactRolesEnum = require("../constants/contactRolesEnum");

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,128}$/;

exports.createContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(20).alphanum().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(6).max(26).required(),
      favorite: Joi.boolean(),
      password: Joi.string().regex(PASSWORD_REGEX).required(),
      role: Joi.string().valid(...Object.values(contactRolesEnum)),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(20),
      email: Joi.string().email(),
      phone: Joi.string().min(6).max(26),
      favorite: Joi.boolean(),
      role: Joi.string().valid(...Object.values(contactRolesEnum)),
    })
    .validate(data);

exports.updateStatusContactValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(20),
      email: Joi.string().email(),
      phone: Joi.string().min(6).max(26),
      favorite: Joi.boolean().required(),
    })
    .validate(data);

/**
 *
 * Regex for password must contain
 *
 * Minimum eight characters, at least one letter and one number:
 * /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
 *
 * Minimum eight characters, at least one letter, one number and one special character:
 * /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
 *
 * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
 * /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
 *
 * Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
 * /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
 *
 * Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
 * /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
 *
 */
