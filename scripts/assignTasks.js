require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");

const assignTasks = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easylang");

    // Retrieve Emily, her manager, and project manager from the database
    const project = await Project.find();
    const tasks = await Task.find();

    project[0].taskList = tasks.map(task => task._id);
    await project[0].save();
    console.log("Project and task assigned successfully!");
  } catch (error) {
    console.error("Error assigning project and task:", error);
  } finally {
    mongoose.connection.close();
  }
};

assignTasks();
