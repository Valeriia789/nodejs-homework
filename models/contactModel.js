const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const contactRolesEnum = require("../constants/contactRolesEnum");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Duplicate email"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(contactRolesEnum),
    default: contactRolesEnum.CONTACT,
  },
});

// Pre save hook
contactSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  // const passwordIsValid = await bcrypt.compare('joilint1111', hashedPassword)
  // console.log(passwordIsValid);

  next();
});

contactSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
