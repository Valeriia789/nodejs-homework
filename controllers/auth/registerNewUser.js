const { catchAsync, signToken } = require("../../utils");
// const userSubscriptionsEnum = require("../../constants/userSubscriptionsEnum");
const User = require("../../models/userModel");
const Email = require('../../services')

exports.registerNewUser = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
    // не обов'язково тут прописувати, по дефолту і так стоїть starter
    // subscription: userSubscriptionsEnum.STARTER,
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  try {
    await new Email(newUser, 'localhost:3000/').sendHello()
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    user: newUser,
    token,
  });
});
