import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import React from "react";


function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/users/register",
                {
                    username,
                    email,
                    password
                }
            );


            console.log(response.data);

            alert("Registration successful!");

            navigate("/login");


        } catch(error) {


            console.log(error);

            alert("Registration failed");

        }

    };

    return (

        <div className="auth-page">


            <div className="auth-card">


                <h1>
                    📚 Read Track
                </h1>


                <h2>
                    Create Account
                </h2>

                <form onSubmit={handleRegister}>


                    <input

                        type="text"

                        placeholder="Username"

                        value={username}

                        required

                        onChange={(e)=>
                            setUsername(e.target.value)
                        }

                    />

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        required

                        onChange={(e)=>
                            setEmail(e.target.value)
                        }

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        required

                        onChange={(e)=>
                            setPassword(e.target.value)
                        }

                    />

                    <button type="submit">

                        Register

                    </button>

                </form>

                <p className="auth-link">

                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                    >
                        {" "}Login
                    </span>

                </p>

            </div>


        </div>

    );

}


export default Register;