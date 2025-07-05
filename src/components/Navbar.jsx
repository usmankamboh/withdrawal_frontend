// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo flex items-center gap-2">
          Student Withdrawal Portal
        </Link>
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        ) : (
          <>
            {user.email !== "mariakamboh@gmail.com" && <Link to="/dashboard" className="navbar-link">Dashboard</Link>}
            {user.email === "mariakamboh@gmail.com" && <Link to="/admin" className="navbar-link"></Link>}
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
