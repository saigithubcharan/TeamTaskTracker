const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks
} =
require("../controllers/taskController");

router.post(
  "/",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  createTask
);

router.get(
  "/",
  authMiddleware,
  getTasks
);

module.exports = router;