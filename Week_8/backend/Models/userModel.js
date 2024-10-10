const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    occupation: { type: String, required: true }
}, { timestamps: true, versionKey: false });


const User = mongoose.model('User', userSchema);
module.exports = User;