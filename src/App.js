import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
//import { NotificationProvider } from "../context/NotificationContext";
import ToastNotify from "./components/ToastNotify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NotificationProvider from "./context/NotificationContext";


const App = () => {
    return (
      <Router>
            <NotificationProvider>
                    <div className="container mt-5">
                        <ToastNotify />

                        <Routes>
                            <Route path="/" element={<Navigate to="/register" />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={<Dashboard />
                                }
                            />
                        </Routes>
                    </div>
                    </NotificationProvider>
                </Router>
    );
};

export default App;