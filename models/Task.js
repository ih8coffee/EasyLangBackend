// models/Tasks.js

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  date: { type: Date, default: Date.now },
  finishDate: { type: Date },
  progress: { type: Number, required: true, min: 0, max: 100 },
  body: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
});

module.exports = mongoose.model("Task", TaskSchema);
