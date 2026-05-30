const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus
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
router.patch(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;