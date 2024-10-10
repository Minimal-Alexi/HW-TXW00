import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const CoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setcourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useContext(AuthContext);


  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete course: ${errorText}`);
      }
      console.log("course deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setcourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const onDeleteClick = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?" + id
    );
    if (!confirm) return;

    if (!token) {
      // Handle unauthorized access
      console.log("You are not authorized to delete this coursey");
      return navigate("/");
    }

    deleteCourse(id);
  };
  const onEditClick = () => {
    navigate(`/edit-course/${id}`)
  }
  return (
    <div className="course-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{course.title}</h2>
          <p>Type: {course.type}</p>
          <p>Description: {course.description}</p>
          <p>Company: {course.company.name}</p>
          <p>Email: {course.company.contactEmail}</p>
          <p>Phone: {course.company.contactPhone}</p>

          {isAuthenticated && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CoursePage;