// /models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  productivity: { type: Number, default: 0 },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["worker", "manager", "projectManager"],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
