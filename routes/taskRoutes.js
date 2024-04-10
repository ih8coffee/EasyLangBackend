// routes/taskRoutes.js

const express = require("express");
const router = express.Router();

const Task = require("../controllers/TaskController");

router.post("/task", Task.createTask);
router.get("/task/:id", Task.getTask);

module.exports = router;
