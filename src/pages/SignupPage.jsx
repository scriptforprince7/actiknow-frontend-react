import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

const SignupPage = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
        await signup(name, email, password);
        toast.success("Signup successfull! Please Log in");
        navigate("/login");
    } catch (error) {
        console.error("Signup Failed", error.response.data);
    }
}
  

return(
  <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
      <button type="submit">Submit</button>
  </form>
);
};

export default SignupPage;
