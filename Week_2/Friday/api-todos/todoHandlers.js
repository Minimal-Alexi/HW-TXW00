const todoList = require('./todoLib');

const getAllToDos = (req,res) =>
    {
        const ToDo = todoList.getAll();
        res.json(ToDo);
    }

const createTodo = (req,res) =>
    {
        const {task,completed,dueDate} = req.body;
        const newToDo = todoList.addOne(task,completed,dueDate);
        if (newToDo)
            {
                res.json(newToDo);
            }
        else
        {
            res.status(500).json({message: "Failed to create ToDo"});
        }
    }

const getTodoById = (req,res) => 
    {
        const id = req.params.todoId;
        const findToDo = todoList.findById(id);
        if (findToDo)
            {
                res.json(findToDo);
            }
        else
        {
            res.status(404).json({message: "ToDo not found"});
        }
    }

const updateTodo = (req,res) =>
    {
        const id = req.params.todoId;
        const updatedData = req.body;
        const updatedToDo = todoList.updateOneById(id,updatedData);
        if (updatedToDo)
            {
                res.json(updatedToDo);
            }
        else
        {
            res.status(404).json({message: "ToDo not found"});
        }
    }

const deleteToDo = (req,res) =>
    {
        const id = req.params.todoId;
        const isDeleted = todoList.deleteOneById(id);
        if (isDeleted)
            {
                res.json({message: "ToDo Deleted successfully!"});
            }
        else
        {
            res.status(404).json({message: "ToDo not found"});
        }
    }

module.exports = {
    getAllToDos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteToDo
}