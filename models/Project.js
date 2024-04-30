// /models/Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  progress: { type: Number, required: true, min: 0, max: 100 },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
  taskList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
