import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async(e)=>{

        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                username,
                password
            });

            console.log(response.data);

            navigate("/dashboard");
        } catch(error){

            console.log(error);
            alert("Invalid username or password");

        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;