const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOwnTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      _id: req.user.taskList[0].toHexString(),
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        bodyFinal: req.body.bodyFinal,
        inReview: req.body.inReview,
        state: req.body.state,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log(task);

    if (task) {
      const project = await Project.findById(task.projectID);

      console.log(project);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const tasks = await Task.find({ projectId: task.projectId });
      const falseStateTasksCount = tasks.filter(t => t.state === false).length;
      const progress = (falseStateTasksCount / tasks.length) * 100;

      // Update project state based on progress
      if (falseStateTasksCount === 0) {
        project.state = false;
      } else {
        project.progress = progress;
      }

      await project.save();
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
