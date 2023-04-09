const Joi = require("joi");
const userRolesEnum = require("../constants/userRolesEnum");
const userSubscriptionsEnum = require("../constants/userSubscriptionsEnum");

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,128}$/;

exports.registerUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWORD_REGEX).required(),
      role: Joi.string().valid(...Object.values(userRolesEnum)),
      subscription: Joi.string().valid(...Object.values(userSubscriptionsEnum)),
      avatarURL: Joi.string(),
    })
    .validate(data);
