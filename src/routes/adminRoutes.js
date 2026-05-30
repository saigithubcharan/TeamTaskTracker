const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");
/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Admin dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin dashboard data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/dashboard",
  authMiddleware,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

module.exports = router;