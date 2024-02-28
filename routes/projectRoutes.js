// /routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

router.post("/projects", ProjectController.createProject);
router.get("/projects/:id", ProjectController.getProject);

module.exports = router;
