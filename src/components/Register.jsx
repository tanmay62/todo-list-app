import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notifyReducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = useCallback(async () => {
        if (!username || !password || !confirmPassword) {
            dispatch(showNotification("All fields are required", "danger"));
            return;
        }

        if (password !== confirmPassword) {
            dispatch(showNotification("Passwords do not match", "danger"));
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                dispatch(showNotification("User registered successfully!", "success"));
                navigate("/login");
            } else {
                dispatch(showNotification(result.message || "Registration failed", "danger"));
            }
        } catch (error) {
            dispatch(showNotification("Server error. Please try again later.", "danger"));
        }
    }, [username, password, confirmPassword, dispatch, navigate]);

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
                        backgroundColor: "#ffffff"
                    }}
                >
                    <h3 className="text-center mb-3 text-primary">Register</h3>

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

                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button className="btn btn-primary w-100 mb-2" onClick={handleRegister}>
                        Register
                    </button>

                    <a href="/login" className="d-block text-center text-decoration-none fw-bold text-primary">
                        Already a user? <span className="text-danger">Login here</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Register;