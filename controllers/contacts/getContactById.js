const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");

const getContactById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  // // перевіряємо пароль:
  // const contact = await Contact.findById(id).select("+password");
  // const passwordIsValid = await contact.checkPassword(
  //   "Pass1234",
  //   contact.password
  // );
  // console.log(passwordIsValid);

  res.status(200).json({
    contact,
  });
});

module.exports = getContactById;
