const { catchAsync } = require("../../utils");

exports.updateMyPassword = catchAsync(async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
