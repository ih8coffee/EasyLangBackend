// models/Tasks.js

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  userAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  finishDate: { type: Date },
  progress: { type: Number, required: true, min: 0, max: 100 },
  bodyInitial: { type: String, required: true },
  bodyFinal: { type: String },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
  inReview: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
