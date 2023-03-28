const { Types } = require("mongoose");

const { AppError, catchAsync, contactValidator } = require("../utils");
const Contact = require("../models/contactModel");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) return next(new AppError(400, "Invalid contact id.."));
  // можна повернути загальну помилку, не вказуючи подробиці:
  // if (!idIsValid) return new AppError(404, "Contact does not exist...")

  // check if contact with this id exists in DB
  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) {
    return next(new AppError(404, "Contact not found.."));
  }

  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator.createContactDataValidator(
    req.body
  );

  if (error)
    return next(
      new AppError(
        400,
        error.details.map((item) => item.message)
      )
    );

  const { email } = value;
  // const contactExists = await Contact.findOne({ email }).select('_id')
  // те саме, але використовуючи метод exists, який повертає id:
  const contactExists = await Contact.exists({ email });

  if (contactExists)
    return next(new AppError(409, "Contact with this email already exists :/"));

  req.body = value;

  next();
});

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator.updateContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);
    return next(new AppError(400, "ERROR. Missing contact data.."));
  }

  req.body = value;

  next();
});

exports.checkUpdateStatusContact = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator.updateStatusContactValidator(
    req.body
  );

  if (error) {
    console.log(req.body);
    return next(new AppError(400, "ERROR...missing field favorite"));
  }

  req.body = value;

  next();
});
