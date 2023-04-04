const { catchAsync } = require("../../utils");

exports.updateCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({
    user: req.user,
  })
})