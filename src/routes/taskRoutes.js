const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getTaskById,
  updateTask,deleteTask
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
router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

router.put(
  "/:id",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  deleteTask
);

module.exports = router;