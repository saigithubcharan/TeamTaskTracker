const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

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