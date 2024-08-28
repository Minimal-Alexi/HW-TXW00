const {
  pets,
  addOne,
  findById,
  updateOne,
  deleteOne,
} = require("./utilities.js");

// GET /pets
const getAllPets = (req, res) => {
  res.json(pets);
};

// POST /pets
const createPet = (req, res) => {
  const { name, species, age, color, weight } = req.body; // 

  const newPet = addOne(name, species, age, color, weight); // Pass all fields

  if (newPet) {
    res.json(newPet);
  } else {
    // Handle error (e.g., failed to create pet)
    res.status(500).json({ message: "Failed to create pet" });
  }
};

// GET /pets/:petId
const getPetById = (req, res) => {
  const petId = req.params.petId;
  const pet = findById(petId);
  res.json(pet);
};

// PUT /pets/:petId
const updatePet = (req, res) => {
  const petId = req.params.petId;

  // Destructure all potential update fields
  const { name, species, age, color, weight } = req.body;

  const updatedPet = updateOne(petId, { name, species, age, color, weight }); // Pass updated data as an object

  if (updatedPet) {
    res.json(updatedPet);
  } else {
    // Handle update failure (e.g., pet not found)
    res.status(404).json({ message: "Pet not found" });
  }
};

// DELETE /pets/:petId
const deletePet = (req, res) => {
  const petId = req.params.petId;

  const isDeleted = deleteOne(petId);

  if (isDeleted) {
    res.json({ message: "Pet deleted successfully" });
  } else {
    // Handle deletion failure (e.g., pet not found)
    res.status(404).json({ message: "Pet not found" });
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};