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

module.exports = {
  createTask,
  getTasks
};