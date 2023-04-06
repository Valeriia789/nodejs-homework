const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const userSubscriptionsEnum = require("../constants/userSubscriptionsEnum");
const userRolesEnum = require("../constants/userRolesEnum");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Duplicate email"],
      trim: true,
      lowercase: true,
    },
    // avatarURL: {
    //   type: String,
    //   default: 'default-avatar.jpg'
    // },
    avatarURL: String,
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionsEnum),
      default: userSubscriptionsEnum.STARTER,
    },
    role: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER,
    },
    token: String,
    passwordResetToken: String,
    // passwordResetToken буде валідний певний час (10хв.):
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);


// pre save хук відпрацьовує в двох випадках: коли робимо кріейт і коли апдейт
// обов'язково треба писати function, якщо написати через стрілку, не буде відпрацьовувати
userSchema.pre("save", async function (next) {
  // якщо нам потрібно, щоб відпрацьовував тільки на кріейт, робимо перевірку:
  // в даному випадку this - це поточний юзер
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
  }

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  // const passwordIsValid = await bcrypt.compare('joilint1111', hashedPassword)
  // console.log(passwordIsValid);

  next();
});


// Custom method
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);


// декларую через function, щоб мати доступ до this
userSchema.methods.createPasswordResetToken = function() {
  // crypto.randomBytes генерує рандомну стрінгу
  const resetToken = crypto.randomBytes(32).toString('hex');

  // токен необхідно захешувати:
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


const User = mongoose.model("User", userSchema);

module.exports = User;
