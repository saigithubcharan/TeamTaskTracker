const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");
/**
 * @swagger
 * /api/test/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      user: req.user
    });
  }
);

module.exports = router;