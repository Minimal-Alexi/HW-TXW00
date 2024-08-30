let todoList = [];
let nextID = 1;

const addOne = (task,completed,dueDate) => 
    {
        if (!task || completed == undefined || !dueDate)
            return false;

        const todoTask = 
        {
            id: nextID++,
            task,
            completed,
            dueDate
        }
        todoList.push(todoTask);
        return todoTask;
    }

const getAll = () => 
    {
        return todoList;
    }

const findById = (id) => 
    {
        numericID = Number(id);
        const task = todoList.find(task => task.id === numericID);
        return task || false
    }

const updateOnebyId = (id,updatedData) =>
    {
        task = findById(id);
        if(task)
            {
                if(updatedData.task)task.task = updatedData.task;
                if(updatedData.completed)task.completed = updatedData.completed;
                if(updatedData.dueDate)task.dueDate = updatedData.dueDate;
                return task;
            }
        return false;
    }

const deleteOnebyId = (id) =>
    {
        taskdel = findById(id);
        if(taskdel)
            {
                const initialLength = todoList.length;
                todoList = todoList.filter(task => task.id !== Number(id));
                return initialLength > todoList.length;
            }
        return false;
    }

if (require.main === module) {
        console.log("addOne called:",addOne("Buy groceries",false,"2024-08-30"));
        console.log("addOne called:",addOne("Do homework",true,"2024-09-20"));

        console.log("getAll called:", getAll());

        console.log("findbyID called:",findById(1));
        console.log("findbyID called:",findById(2));
        console.log("findbyID called:",findById(3));

        console.log("updateOnebyID called:",updateOnebyId(1,{completed : true}));
        console.log("updateOnebyID called:",updateOnebyId(3,{task: "Get faked",completed : true}));
        
        console.log("deleteOnebyID:",deleteOnebyId(1));
        console.log("findbyID called:",findById(1));
        console.log("deleteOnebyID:",deleteOnebyId(3));
        console.log("getAll called:", getAll());
    }

    const ToDos = {
        getAll,
        addOne,
        findById,
        updateOnebyId,
        deleteOnebyId
    };
    
    module.exports = ToDos;