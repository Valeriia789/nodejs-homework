const { AppError, catchAsync, contactValidator } = require("../../utils");

const checkContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator.updateContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);
    console.log(req.body);
    return next(new AppError(400, "ERROR...missing requested field"));
  }

  req.body = value;

  next();
});

module.exports = checkContactData;
