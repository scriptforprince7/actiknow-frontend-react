import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, name } = response.data;

      // Store token & name in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      toast.success(`Welcome back, ${name}!`);
      navigate("/"); // Redirect to Home page
    } catch (error) {
      console.error("Login Failed", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Invalid credentials. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
      <p>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default LoginPage;
