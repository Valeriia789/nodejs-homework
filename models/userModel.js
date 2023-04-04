const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  },
  {
    timestamps: true,
  }
);

// Pre save hook // працює на create і save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  // const passwordIsValid = await bcrypt.compare('joilint1111', hashedPassword)
  // console.log(passwordIsValid);

  next();
});

// Custom method
userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = mongoose.model("User", userSchema);

module.exports = User;
