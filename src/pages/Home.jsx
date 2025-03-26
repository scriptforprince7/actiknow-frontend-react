import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Home.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check if token exists and extract user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    if (token && storedName) {
      try {
        const decoded = jwtDecode(token);
        setUserName(storedName || decoded.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Actiknow Consulting</h1>

      {/* Avatar icon */}
      {userName ? (
        <div className="avatar-icon" onClick={handleLogout} title="Logout">
          🚪 Logout
        </div>
      ) : (
        <Link to="/login" className="avatar-icon" title="Login">
          👤
        </Link>
      )}

      {/* Display user name if logged in */}
      {userName ? <h3>Hey, {userName}!</h3> : <h2>Welcome, Guest!</h2>}

      {/* Home buttons */}
      <div className="home-buttons">
        <Link to="/all-products">
          <button>All Todos</button>
        </Link>
        {/* <Link to="/dashboard/add-product">
          <button>Create Todo</button>
        </Link> */}
        {userName && (
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
