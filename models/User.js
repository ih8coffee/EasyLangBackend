// /models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  productivity: { type: Number, default: 0 },
  role: {
    type: String,
    required: true,
    enum: ["worker", "manager", "projectManager"],
    default: "worker",
  },
});

module.exports = mongoose.model("User", UserSchema);
