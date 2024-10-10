import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import useField from "../hooks/useField"; // Import the useField hook

const AddCoursePage = () => {
  const { token } = useContext(AuthContext); // Access Auth
  const navigate = useNavigate();

  // Use useField for each form field
  const title = useField("text");
  const duration = useField("text");
  const fee = useField("number");
  const instructorName = useField("text");
  const contactEmail = useField("email");
  const contactPhone = useField("tel");

  const addCourse = async (newCourse) => {
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return false;
    }

    try {
      console.log("Adding course:", newCourse);
      console.log("token", token);
      const res = await fetch("/api/courses", { // Adjusted to courses endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });
      if (!res.ok) {
        throw new Error("Failed to add course");
      }
      return true;
    } catch (error) {
      console.error("Error adding course:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newCourse = {
      title: title.value,
      duration: duration.value,
      fee: parseFloat(fee.value), // Convert fee to float
      instructor: {
        name: instructorName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
    };

    const success = await addCourse(newCourse);
    if (success) {
      console.log("Course Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the course");
    }
  };

  if (!token) {
    return <div>You are not authorized to add a course.</div>; // Handle unauthorized access
  }

  return (
    <div className="create">
      <h2>Add a New Course</h2>
      <form onSubmit={submitForm}>
        <label>Course Title:</label>
        <input
          {...title}
          required
        />

        <label>Duration:</label>
        <input
          {...duration}
          required
        />

        <label>Fee:</label>
        <input
          {...fee}
          required
        />

        <label>Instructor Name:</label>
        <input
          {...instructorName}
          required
        />

        <label>Contact Email:</label>
        <input
          {...contactEmail}
          required
        />

        <label>Contact Phone:</label>
        <input
          {...contactPhone}
          required
        />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCoursePage;
