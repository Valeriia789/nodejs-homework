const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");

const updateContactById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  res.status(200).json({
    updatedContact,
  });
});

module.exports = updateContactById;
