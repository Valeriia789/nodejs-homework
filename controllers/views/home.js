const { catchAsync } = require("../../utils");

const home = catchAsync(async (req, res) => {
  res.status(200).render("home", {
    title: "Contacts Home",
    active: "home",
  });
});

module.exports = home;
