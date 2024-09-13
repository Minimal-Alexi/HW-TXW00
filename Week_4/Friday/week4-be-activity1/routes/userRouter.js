const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // patchUser
} = require("../controllers/userController");

// GET /Users
router.get("/", getAllUsers);

// POST /Users
router.post("/", createUser);

// GET /Users/:UserId
router.get("/:UserId", getUserById);

// PUT /Users/:UserId
router.put("/:UserId", updateUser);

// DELETE /Users/:UserId
router.delete("/:UserId", deleteUser);

// Update User using PATCH 
// router.patch('/:UserId', patchUser)

module.exports = router;
