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
  updateTask,deleteTask,
  getTaskAnalytics
} =
require("../controllers/taskController");
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     responses:
 *       201:
 *         description: Task created
 */
router.post(
  "/",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  createTask
);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task list
 */
router.get(
  "/",
  authMiddleware,
  getTasks
);
/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task status updated
 */
router.patch(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);
/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details retrieved successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  updateTask
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  deleteTask
);
/**
 * @swagger
 * /api/tasks/analytics:
 *   get:
 *     summary: Get task analytics
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task statistics
 */
router.get(
  "/analytics",
  authMiddleware,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  getTaskAnalytics
);

module.exports = router;