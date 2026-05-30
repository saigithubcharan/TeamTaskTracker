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
router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  getUserById
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  updateUser
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteUser
);

module.exports = router;