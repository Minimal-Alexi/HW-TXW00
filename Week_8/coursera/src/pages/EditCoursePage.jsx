import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import useField from "../hooks/useField";

const EditCoursePage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const title = useField("text");
  const duration = useField("text");
  const fee = useField("number");
  const instructorName = useField("text");
  const contactEmail = useField("email");
  const contactPhone = useField("tel");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }

      try {
        const res = await fetch(`/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch course");
        }

        const course = await res.json();
        // Set initial values using onChange
        title.onChange({ target: { value: course.title } });
        duration.onChange({ target: { value: course.duration } });
        fee.onChange({ target: { value: course.fee.toString() } });
        instructorName.onChange({ target: { value: course.instructor.name } });
        contactEmail.onChange({ target: { value: course.instructor.contactEmail } });
        contactPhone.onChange({ target: { value: course.instructor.contactPhone } });
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const updateCourse = async (updatedCourse) => {
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return false;
    }

    try {
      console.log("Updating course:", updatedCourse);
      const res = await fetch(`/api/courses/${id}`, { // Use PUT method for updating
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!res.ok) {
        throw new Error("Failed to update course");
      }
      return true;
    } catch (error) {
      console.error("Error updating course:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedCourse = {
      title: title.value,
      duration: duration.value,
      fee: parseFloat(fee.value), // Convert fee to float
      instructor: {
        name: instructorName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
    };

    const success = await updateCourse(updatedCourse);
    if (success) {
      console.log("Course Updated Successfully");
      navigate("/");
    } else {
      console.error("Failed to update the course");
    }
  };

  if (!token) {
    return <div>You are not authorized to edit a course.</div>;
  }

  return (
    <div className="edit">
      <h2>Edit Course</h2>
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

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
