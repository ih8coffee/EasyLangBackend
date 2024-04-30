const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");
const auth = require("../middleware/auth");
const rbac = require("../middleware/rbac");

// Creating a new project requires PM level authorization
router.post("/projects", auth, rbac(["pm"]), ProjectController.createProject);

// Listing all projects: Restricted to authenticated users
router.get("/projects", auth, ProjectController.getAllProjects);

// Listing own projects: Restricted to authenticated users
router.get("/projects/me", auth, ProjectController.getOwnProjects);

// Fetching a single project by ID: Restricted to authenticated users
router.get("/projects/:projectId", auth, ProjectController.getProjectById);

// Updating a project: Requires being a PM
router.put(
  "/projects/:projectId",
  auth,
  rbac(["pm"]),
  ProjectController.updateProject
);

// Deleting a project: Requires being a PM
router.delete(
  "/projects/:projectId",
  auth,
  rbac(["pm"]),
  ProjectController.deleteProject
);

module.exports = router;
