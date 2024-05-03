const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

// Creating a new task requires PM level authorization
router.post("/tasks/", auth, rbac(["pm"]), TaskController.createTask);

// Listing all own tasks: Restricted to authenticated users
router.get("/tasks/", auth, TaskController.getOwnTasks);

// Listing tasks from a project: Restricted to authenticated users
router.get("/projects/:projectID/tasks", auth, TaskController.getProjectTasks);

// Fetching a single task by ID: Restricted to authenticated users
router.get("/tasks/:taskId", auth, TaskController.getTaskById);

// Updating a task: Requires being a PM
router.put("/tasks/:taskId", auth, TaskController.updateTask);

// Deleting a task: Requires being a PM
router.delete("/tasks/:taskId", auth, TaskController.deleteTask);

module.exports = router;
