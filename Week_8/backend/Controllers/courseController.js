const Courses = require('../Models/courseModel');
const mongoose = require("mongoose");

//GET /Courses
const getAllCourses = async (req, res) => {
    try {
        const courseList = await Courses.find({}).sort({ createdAt: -1 });
        res.status(200).json(courseList);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve Courses." });
    }
};

//GET /Courses/:courseID

const getCoursebyID = async (req, res) => {
    const courseID = req.params.courseID;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({ message: "Invalid courseID" })
    }
    try {
        const course = await Courses.findById(courseID);
        if (course) {
            res.status(200).json(course);
        }
        else {
            res.status(404).json({ message: "Course not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve Course." });
    }
}

//POST /Courses

const createCourse = async (req, res) => {
    try
    {
        const newCourse = await Courses.create({...req.body});
        res.status(201).json(newCourse);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create Course", error: error.message });
    }
}

//PATCH /Courses/:courseID

const updateCourse = async (req, res) => {
    const courseID = req.params.courseID;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({ message: "Invalid courseID" })
    }
    try {
            const updatedCourse = await Courses.findOneAndUpdate(
                {_id:courseID},
                {...req.body},
                {new: true},
            )
            if (updatedCourse) {
                res.status(200).json(updatedCourse);
            }
            else {
                res.status(404).json({ message: "Course not found." });
            }
        }
    catch (error) {
            res.status(500).json({ message: "Failed to update Course." });
        }
}

//DELETE /Courses/:courseID

const deleteCourse = async (req, res) => {
    const courseID = req.params.courseID;
    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({ message: "Invalid courseID" })
    }
    try {
        const deletedCourse = await Courses.findOneAndDelete({_id:courseID})
        if (deletedCourse) {
            res.status(200).json({message:"Course deleted successfully."});
        }
        else {
            res.status(404).json({ message: "Course not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update Course." });
    }
}

module.exports =
{
    getAllCourses,
    getCoursebyID,
    createCourse,
    updateCourse,
    deleteCourse
}