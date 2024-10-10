import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  
  const firstName = useField("text");
  const lastName = useField("text");
  const username = useField("text");
  const password = useField("password");
  const gender = useField("text");
  const contactNumber = useField("text");
  const occupation = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = await signup({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      gender: gender.value,
      contactNumber: contactNumber.value,
      occupation: occupation.value,
    });

    if (userData) {
      console.log("success");
      setUser(userData);
      navigate("/");
    } else {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>First Name:</label>
        <input {...firstName} />
        <label>Last Name:</label>
        <input {...lastName} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Contact Number:</label>
        <input {...contactNumber} />
        <label>Occupation:</label>
        <input {...occupation} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
