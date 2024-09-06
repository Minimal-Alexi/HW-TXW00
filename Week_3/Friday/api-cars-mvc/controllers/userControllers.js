const User = require("../models/userModel");

// GET /users
const getAllUsers = (req, res) => {
  const Users = User.getAll();
  res.json(Users);
};

// POST /users
const createUser = (req, res) => {
  const newUser = User.addOne({...req.body})
  if (newUser)
    {
      res.json(newUser);
    }
  else
  {
    res.status(500).json({message:"Failed to create user."});
  }
};

// GET /users/:userId
const getUserById = (req, res) => {
  const gotUser = User.findById(req.params.userId)
  if (gotUser)
    {
      res.json(gotUser);
    }
  else
  {
    res.status(404).json({message:"User not found."})
  }
};

// PUT /users/:userId
const updateUser = (req, res) => {
  const id = req.params.userId;
  updUser = User.updateOneById(id,{...req.body});
  if(updUser)
    {
      res.json(updUser);
    }
  else
  {
    res.status(404).json({message:"User not found."})
  }
};

// DELETE /users/:userId
const deleteUser = (req, res) => {
  delUser = User.deleteOneById(req.params.userId);
  if(deleteUser)
    {
      res.json({message:"Succesfully deleted user."});
    }
  else
  {
    res.status(404).json({message:"User not found."})
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
