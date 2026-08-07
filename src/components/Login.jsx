import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import React from "react";

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

            navigate("/dashboard");
        } catch(error){

            console.log(error);
            alert("Invalid username or password");

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>
                    📚 Read Track
                </h1>

                <h2>
                    Login
                </h2>

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


                <p className="auth-link">
                    Don't have an account?
                    <span onClick={() => navigate("/register")}>
                        {" "}Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;