const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const AdminLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { timeStamps: true }
);


AdminLoginSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified, otherwise it will change every time we save the user!
    return next();
  }
  const password = this.password;

  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;

  next();
});

AdminLoginSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};


module.exports = mongoose.model("AdminLogin", AdminLoginSchema);
