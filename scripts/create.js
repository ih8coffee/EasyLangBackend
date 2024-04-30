require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

const create = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/easylang");

    // Create users
    const admin = new User({
      username: "Admin",
      name: "John",
      surname: "Doe",
      email: "admin@example.com",
      password: "Password123",
      role: "admin",
    });

    const projectManager = new User({
      username: "ProjectManager",
      name: "Jane",
      surname: "Smith",
      email: "pm@example.com",
      password: "Password123",
      role: "projectManager",
    });

    const manager = new User({
      username: "Manager",
      name: "David",
      surname: "Johnson",
      email: "manager@example.com",
      password: "Password123",
      role: "manager",
    });

    const worker = new User({
      username: "Worker",
      name: "Emily",
      surname: "Davis",
      email: "worker@example.com",
      password: "Password123",
      role: "worker",
    });

    // Save users
    await admin.save();
    await projectManager.save();
    await manager.save();
    await worker.save();

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

    console.log("Project and task created successfully!");
  } catch (error) {
    console.error("Error creating project and task:", error);
  } finally {
    mongoose.connection.close();
  }
};

create();
