const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");

const removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndDelete(id);

  res.sendStatus(204);
});

module.exports = removeContact;
