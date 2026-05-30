const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      assignee: req.body.assignee,
      dueDate: req.body.dueDate,

      organizationId:
        req.user.organizationId,

      createdBy:
        req.user.id
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET TASKS
const getTasks = async (req, res) => {

  try {

    const {
      page = 1,
      limit = 10,
      status,
      priority,
      assignee
    } = req.query;

    const filter = {
      organizationId:
        req.user.organizationId
    };

    if (status)
      filter.status = status;

    if (priority)
      filter.priority = priority;

    if (assignee)
      filter.assignee = assignee;

    const tasks =
      await Task.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
const updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        status: 404,
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      });
    }

    const allowedTransitions = {
      TODO: ["IN_PROGRESS", "BLOCKED"],
      IN_PROGRESS: ["IN_REVIEW", "BLOCKED"],
      IN_REVIEW: ["DONE", "BLOCKED"],
      DONE: [],
      BLOCKED: []
    };

    const currentStatus =
      task.status;

    if (
      !allowedTransitions[
        currentStatus
      ].includes(status)
    ) {
      return res.status(400).json({
        status: 400,
        code:
          "INVALID_STATUS_TRANSITION",
        message:
          `Cannot move from ${currentStatus} to ${status}`
      });
    }

    const isManager =
      req.user.role === "MANAGER";

    const isAdmin =
      req.user.role === "ADMIN";

    const isAssignee =
      task.assignee?.toString() ===
      req.user.id;

    if (
      !isManager &&
      !isAdmin &&
      !isAssignee
    ) {
      return res.status(403).json({
        status: 403,
        code: "FORBIDDEN",
        message:
          "You cannot update this task"
      });
    }

    task.status = status;

    await task.save();

    res.json({
      message:
        "Task status updated",
      task
    });

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
const getTaskById = async (req, res) => {

  try {

    const task = await Task.findOne({
      _id: req.params.id,
      organizationId:
        req.user.organizationId
    });

    if (!task) {
      return res.status(404).json({
        status: 404,
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
const updateTask = async (req, res) => {

  try {

    const task =
      await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          organizationId:
            req.user.organizationId
        },
        req.body,
        {
          new: true
        }
      );

    if (!task) {
      return res.status(404).json({
        status: 404,
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
const deleteTask = async (req, res) => {

  try {

    const task =
      await Task.findOneAndDelete({
        _id: req.params.id,
        organizationId:
          req.user.organizationId
      });

    if (!task) {
      return res.status(404).json({
        status: 404,
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      });
    }

    res.json({
      message:
        "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  getTaskById,
  updateTask,
  deleteTask
};