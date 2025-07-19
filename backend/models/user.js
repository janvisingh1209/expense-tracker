const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  {
    timestamps: true,   // time stamp tells when doc is created and updated
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) { // execute fn before saving
  if (!this.isModified("password")) return next();  // if already hashed move on to comparing using comparePassword
  this.password = await bcrypt.hash(this.password, 10);  // if new pass then hash it using 10 salt rounds
  next();
});

// Compare passwords only req at time of login not signup
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password); //compares hashed pass to the pass user added if matches then jwt  is returned
};

module.exports = mongoose.model("User", UserSchema);
