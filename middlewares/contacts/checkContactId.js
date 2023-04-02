const { Types } = require("mongoose");

const Contact = require("../../models/contactModel");
const { AppError, catchAsync } = require("../../utils");

const checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) return next(new AppError(400, "Invalid contact id.."));

  // check if contact with this id exists in DB
  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) {
    return next(new AppError(404, "Contact not found.."));
  }

  next();
});

module.exports = checkContactId;
