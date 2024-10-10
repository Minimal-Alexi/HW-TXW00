import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import ThemeContext from '../Context/ThemeContext';
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, clearUser, username, isLoading } = useContext(AuthContext);

  const handleClick = (e) => {
    clearUser();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Courses</h1>
      </Link>
      <div className="links">
        {isAuthenticated ? (
          <div>
            <Link to="/courses/add-job">Add Job</Link>
            {username && <span>{username}</span>}
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
      <button onClick={toggleTheme}>Toggle</button>
    </nav>
  );
};

export default Navbar;