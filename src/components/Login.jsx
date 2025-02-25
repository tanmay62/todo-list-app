import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../redux/notifyReducer";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../redux/authReducer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    //const { login } = useAuth(); // Get login function from context
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!username || !password) {
            dispatch(showNotification("Username and Password are required", "danger"));
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Ensure session is maintained
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                dispatch(login(username)) // Store user in Auth Context
                dispatch(showNotification("Login Successful!", "success"));
                navigate(`/dashboard?user=${username}`);
            } else {
                dispatch(showNotification(result.message || "Invalid credentials", "danger"));
            }
        } catch (error) {
            dispatch(showNotification("Server error. Please try again later.", "danger"));
        }
    };

    return (
        <div className="vh-100 d-flex flex-column bg-light">
            <div className="text-center py-3 bg-white shadow-sm">
                <h1 className="text-primary fw-bold m-0">To-Do List App</h1>
            </div>

            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <div
                    className="card p-4 shadow-lg"
                    style={{
                        width: "350px",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <h3 className="text-center mb-3 text-primary">Login</h3>
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
                        Login
                    </button>
                    <a href="/register" className="d-block text-center text-decoration-none fw-bold text-primary">
                        Don't have an account? <span className="text-danger">Sign up</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;