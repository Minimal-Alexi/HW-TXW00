const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true },
    fee: { type: Number, required: true },
    instructor: {
      name: { type: String, required: true },
      contactEmail: { type: String, required: true },
      contactPhone: { type: String, required: true }
    }
  });
  
  // Configure JSON output to include virtuals
  courseSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      return ret;
    }
  });
  
  // Create and export the Course model
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;