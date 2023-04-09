const { catchAsync, signToken } = require("../../utils");
// const userSubscriptionsEnum = require("../../constants/userSubscriptionsEnum");
const User = require("../../models/userModel");

exports.registerNewUser = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    // не обов'язково тут прописувати, по дефолту і так стоїть starter
    // subscription: userSubscriptionsEnum.STARTER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  res.status(201).json({
    user: newUser,
    token,
  });
});
