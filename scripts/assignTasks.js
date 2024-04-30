require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

const assignTasks = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easylang", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Retrieve Emily, her manager, and project manager from the database
    const emily = await User.findOne({ username: "Worker" });
    const manager = await User.findOne({ role: "manager" });
    const projectManager = await User.findOne({ role: "projectManager" });

    // Create translation project
    const translationProject = new Project({
      projectName: "Translation Project",
      description: "Translate the following:",
      progress: 0,
    });

    // Save translation project
    await translationProject.save();

    // Create translation task for the translation project
    const translationTask = new Task({
      taskName: "Translate Text",
      projectID: translationProject._id,
      progress: 0,
      body: "Hello, how are you today?",
      description: "Translate this short text to other languages",
    });

    // Save translation task
    await translationTask.save();

    // Assign the project and task to Emily
    emily.projectList.push(translationProject._id);
    emily.taskList.push(translationTask._id);
    await emily.save();

    // Assign the project and task to Emily's manager
    manager.projectList.push(translationProject._id);
    manager.taskList.push(translationTask._id);
    await manager.save();

    // Assign the project and task to Emily's project manager
    projectManager.projectList.push(translationProject._id);
    projectManager.taskList.push(translationTask._id);
    await projectManager.save();

    console.log("Project and task assigned successfully!");
  } catch (error) {
    console.error("Error assigning project and task:", error);
  } finally {
    mongoose.connection.close();
  }
};

assignTasks();
