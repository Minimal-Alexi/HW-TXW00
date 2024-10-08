import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const username = useField("text");
  const password = useField("password");

  const { login, isLoading, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      const userData = await login({ username: username.value, password: password.value });

      if (userData) {
          console.log("Login successful:", userData);
          setUser(userData);
          navigate("/");
      } else {
          console.error("Login failed:", error);
      }
  };


  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;