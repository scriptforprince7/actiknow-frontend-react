import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signup(name, email, password);
            toast.success("Signup successfull! Please Log in");
            navigate("/login");
        } catch (error) {
            console.error("Signup Failed", error.response.data);
        }
    }
};

return(
    <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e)=>setName(e.target.value)} />
        <input type="text" placeholder="password" onChange={(e)=>setName(e.target.value)} />
        <button type="submit">Submit</button>
    </form>
);

export default Signup;