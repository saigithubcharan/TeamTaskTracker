const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} =
require("../controllers/userController");
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  createUser
);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User list
 */
router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  getUsers
);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  getUserById
);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 */
router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  updateUser
);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteUser
);

module.exports = router;