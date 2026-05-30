const express = require("express");

const router = express.Router();

const {
  register,
  login,
  refreshAccessToken
} = require("../controllers/authController");
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Authentication]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  "/register",
  register
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  login
);
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Generate new access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.post(
  "/refresh",
  refreshAccessToken
);

module.exports = router;