const express = require("express");
const app = express();

const {
  getAllToDos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteToDo,
} = require("./todoHandlers"); // 'todoHandlers.js' contains the route handlers

// Middleware to parse JSON
app.use(express.json());

// ROUTES

// GET /todos
app.get("/todos", getAllToDos);

// POST /todos
app.post("/todos", createTodo);

// GET /todos/:todoId
app.get("/todos/:todoId", getTodoById);

// PUT /todos/:todoId
app.put("/todos/:todoId", updateTodo);

// DELETE /todos/:todoId
app.delete("/todos/:todoId", deleteToDo);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
