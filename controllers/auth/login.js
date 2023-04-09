const { catchAsync, AppError, signToken } = require("../../utils");
const User = require("../../models/userModel");

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!password) return next(new AppError(401, 'Not authorized'));
  
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid)
    return next(
      new AppError(400, "Помилка від Joi або іншої бібліотеки валідації")
    );

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    user,
    token,
  });
});
