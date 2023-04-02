const { catchAsync, AppError, userValidator } = require("../../utils");
const User = require('../../models/userModel')

const checkRegistrationUserData = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.registerUserDataValidator(
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

  const userExists = await User.exists({ email });

  if (userExists)
    return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});

module.exports = checkRegistrationUserData