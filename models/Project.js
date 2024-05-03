// /models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  finishDate: { type: Date },
  expectedDate: { type: Date, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
  taskList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  completedTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  userAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
