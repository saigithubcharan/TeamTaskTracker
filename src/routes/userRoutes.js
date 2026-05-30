const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createUser,
  getUsers
} =
require("../controllers/userController");

router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  createUser
);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  getUsers
);

module.exports = router;