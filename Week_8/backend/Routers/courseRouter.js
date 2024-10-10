const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCoursebyID,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../Controllers/courseController");

const {requireAuth} = require("../config/jwtHandling")


router.get("/", getAllCourses);
router.get("/:courseID", getCoursebyID);

router.use(requireAuth)

router.post("/", createCourse);
router.put("/:courseID", updateCourse);
router.delete("/:courseID", deleteCourse);

module.exports = router;