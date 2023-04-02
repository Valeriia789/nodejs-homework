const { catchAsync } = require("../../utils");
const Contact = require("../../models/contactModel");

const updateContactStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  res.status(200).json({
    updatedContact,
  });
});

module.exports = updateContactStatus;
