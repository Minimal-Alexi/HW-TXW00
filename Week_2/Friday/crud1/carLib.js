let carArray = [];
let nextID = 1;

const addOne = (model,color,age) => 
    {
        if (!model || !color || !age)
            return false;

        const newCar = 
        {
            id:nextID++,
            model,
            color,
            age
        }
        carArray.push(newCar)
        return newCar
    }

const getAll = () => 
    {
        return carArray
    }

const findbyID = (ID) => 
    {
        const numericID = Number(ID);
        const car = carArray.find(item => item.id === numericID);
        return car || false;
    }

const updateOneByID = (id,updatedData) => 
    {
        const car = findbyID(id);
        if (car)
            {
                if(updatedData.model)car.model = updatedData.model;
                if(updatedData.color)car.color  = updatedData.color;
                if(updatedData.age)car.age = updatedData.age;
                return car;
            }
        return false;
    }

const deleteOnebyID = (id) =>
    {
        const car = findbyID(id);
        if (car)
            {
                const initialLength = carArray.length;
                carArray = carArray.filter(car => car.id !== Number(id));
                return carArray.length < initialLength;
            }
        return false;
    }

if (require.main === module) {
        // Add cars
        let result = addOne("Corolla", "Red", 3);
        console.log(result);
        result = addOne("Civic", "Blue", 2);
        console.log(result);
    
        console.log("getAll called:", getAll());
    
        console.log("findById called:", findbyID(1));
    
        console.log("updateOneById called:", updateOneByID(1, { age: 4, color: "Black" }));
        console.log("findById called after item updated:", findbyID(1));
    
        console.log("deleteOneById called:", deleteOnebyID(1));
        console.log("findById called after item deleted:", findbyID(1));
    }

    const Car = {
        getAll,
        addOne,
        findbyID,
        updateOneByID,
        deleteOnebyID
    };
    
    module.exports = Car;