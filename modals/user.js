const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    fullname: { type: String },
    mobileNumber: { type: Number },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password
    ? bcrypt
        .hash(this.password, 10)
        .then((encrypted) => {
          this.password = encrypted;
        })

        .finally(() => {
          next();
        })
    : next();
});

userSchema.statics.checkPassword = function (pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass);
};

module.exports = mongoose.model("user", userSchema);
