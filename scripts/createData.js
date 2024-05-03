require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const User = require("../models/User");
const Project = require("../models/Project");
const Task = require("../models/Task");

const createUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/easylang");

    // Create users
    const users = [
      {
        username: "user1",
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        phone: "1234567891",
        password: bycrypt.hashSync("password123", 8),
        role: "worker",
      },
      {
        username: "user2",
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        phone: "1234567892",
        password: bycrypt.hashSync("password123", 8),
        role: "manager",
      },
      {
        username: "user3",
        name: "Alice",
        surname: "Johnson",
        email: "alice.johnson@example.com",
        phone: "1234567893",
        password: bycrypt.hashSync("password123", 8),
        role: "worker",
      },
    ];

    // Save users
    await User.insertMany(users);
    console.log("Users created successfully!");
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

const createProject = async () => {
  try {
    const users = await User.find();
    // Create a project with deadline 1wk from now
    const project = new Project({
      projectName: "Translation Project",
      progress: 0,
      expectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: "Translation of English documents into French",
      userAssigned: [users[0]._id, users[1]._id, users[2]._id],
    });

    // Save project
    await project.save();
    console.log("Project created successfully!");
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

const createTasks = async () => {
  try {
    // Find some users
    const users = await User.find();

    // Find the project
    const project = await Project.findOne();

    // Create tasks
    const tasks = [
      {
        taskName: "Translate Document 1",
        projectID: project._id,
        userAssigned: users[0]._id,
        progress: 0,
        bodyInitial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

        description: "Translate document from English to French",
      },
      {
        taskName: "Translate Document 2",
        projectID: project._id,
        userAssigned: users[0]._id,
        progress: 0,
        bodyInitial:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        description: "Translate document from English to French",
      },
      {
        taskName: "Translate Document 3",
        projectID: project._id,
        userAssigned: users[2]._id,
        progress: 0,
        bodyInitial:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        description: "Translate document from English to French",
      },
    ];

    // Save tasks
    await Task.insertMany(tasks);

    console.log("Tasks created successfully!");
  } catch (error) {
    console.error("Error creating tasks:", error);
  }
};

const assignProjectAndTasks = async () => {
  const users = await User.find();
  const project = await Project.find();
  const tasks = await Task.find();

  // Assign tasks to project.tasklist
  project[0].taskList.push(tasks[0]._id);
  project[0].taskList.push(tasks[1]._id);
  project[0].taskList.push(tasks[2]._id);
  await project[0].save();

  // Assign project to users
  users[0].projectList.push(project[0]._id);
  users[1].projectList.push(project[0]._id);
  users[2].projectList.push(project[0]._id);

  // Assign tasks to users
  users[0].taskList.push(tasks[0]._id);
  users[0].taskList.push(tasks[1]._id);
  users[2].taskList.push(tasks[2]._id);

  await Promise.all(users.map(user => user.save()));
  mongoose.connection.close();
};

const createData = async () => {
  await createUsers();
  await createProject();
  await createTasks();
  await assignProjectAndTasks();
};

createData();
