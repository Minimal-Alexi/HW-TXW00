const User = require("../models/userModel");

// GET /Users
const getAllUsers = async (req, res) => {
  const Users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(Users);
};

// POST /Users
const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  res.status(201).json(newUser);
};

// GET /Users/:UserId
const getUserById = async (req, res) => {
  const { UserId } = req.params;

  const user = await User.findById(UserId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// PUT /Users/:UserId
const updateUser = async (req, res) => {
  const { UserId } = req.params;

  const updatedUser = await User.findOneAndUpdate(
    { _id: UserId },
    { ...req.body },
    { new: true, overwrite: true }
  );
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE /Users/:UserId
const deleteUser = async (req, res) => {
  const { UserId } = req.params;

  const deletedUser = await User.findOneAndDelete({ _id: UserId });
  if (deletedUser) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
