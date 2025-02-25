import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodos, addTask, toggleTask, deleteTask, updateTask } from "../redux/todoReducer";
import { showNotification } from "../redux/notifyReducer";
import { logout } from "../redux/authReducer";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get('user')
    const todos = useSelector((state) => state.todos.tasks);
    const user = useSelector((state) => state.auth.user);
    const [task, setTask] = useState("");
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editText, setEditText] = useState("");

    const modalStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
        },
        modal: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            width: "320px",
            textAlign: "center",
        },
        title: {
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "#333",
        },
        message: {
            fontSize: "14px",
            color: "#555",
            marginBottom: "15px",
        },
        footer: {
            display: "flex",
            justifyContent: "center",
            gap: "10px",
        },
        cancelButton: {
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
        },
    };

    const fetchTodos = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/todos/${user || name}`);
            const data = await response.json();
            dispatch(setTodos(data));
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }, [user, dispatch, name]);

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user, fetchTodos]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchTodos();
        }
    }, [user, navigate, fetchTodos]);

    useEffect(() => {
        fetch("http://localhost:5000/api/verify-session", {
          method: "GET",
          credentials: "include", // Important for sending session cookies
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              //setUser(data.username);
              navigate(`/dashboard?user=${data.username}`)
              fetchTodos();
            }
            //setLoading(false);
          })
          .catch((err) => console.error(err));
      }, [fetchTodos, navigate]);

    const handleAddTask = async () => {
        if (editTaskId) {
            // if edit action for todo, update the existing task instead of adding a new one
            handleSaveTask();
            return;
        }

        if (task.trim() === "") {
            dispatch(showNotification("Please input some task !!", "warning"));
            return;
        } else if (task.trim().length < 3) {
            dispatch(showNotification("Task must be at least 3 characters long !!", "warning"));
            return;
        }

        const newTask = { id: Date.now(), text: task, completed: false };

        try {
            await fetch(`http://localhost:5000/api/todos/${user}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            dispatch(addTask(newTask));
            dispatch(showNotification("Task added successfully!", "success"));
            setTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };


    const handleEditTask = (todo) => {
        setEditTaskId(todo.id);
        setEditText(todo.text);
    };

    const handleSaveTask = async () => {
        if (!editTaskId || editText.trim().length < 3) {
            dispatch(showNotification("Task must be at least 3 characters long !!", "warning"));
            return;
        }

        try {
            await fetch(`http://localhost:5000/api/todos/${user}/${editTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: editText }),
            });

            dispatch(updateTask({ id: editTaskId, text: editText }));
            dispatch(showNotification("Task updated successfully!", "success"));
            setEditTaskId(null);
            setEditText("");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleToggleTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${user}/${id}`, {
                method: "PUT",
            });

            dispatch(toggleTask(id));
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };

    const confirmDelete = (id) => {
        setTaskToDelete(id);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;

        try {
            await fetch(`http://localhost:5000/api/todos/${user}/${taskToDelete}`, {
                method: "DELETE",
            });

            dispatch(deleteTask(taskToDelete));
            dispatch(showNotification("Task deleted!", "danger"));
        } catch (error) {
            console.error("Error deleting task:", error);
        }

        setIsModalOpen(false);
        setTaskToDelete(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary">
                    Welcome, {user || name} <img src="https://openmoji.org/data/color/svg/1F44B.svg" alt="" height={46} width={46} />
                </h3>
                <button className="btn btn-danger px-4 shadow-sm" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>

            <div className="card shadow-lg p-4 border-0">
                <h5 className="mb-3 text-dark fw-semibold">
                    <i className="bi bi-plus-circle text-primary me-2"></i> Add New Task
                </h5>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control border-0 shadow-sm"
                        placeholder="Enter a task..."
                        value={editTaskId ? editText : task}
                        onChange={(e) => {
                            if (editTaskId) setEditText(e.target.value);
                            else setTask(e.target.value);
                        }}
                    />
                    <button
                        className={`btn px-4 shadow-sm ${editTaskId ? "btn-success" : "btn-primary"}`}
                        onClick={handleAddTask}
                    >
                        <i className={`bi ${editTaskId ? "bi-check-lg" : "bi-plus-lg"}`}></i>
                        {editTaskId ? " Save" : " Add"}
                    </button>

                </div>
            </div>

            <div className="mt-4">
                <h5 className="text-secondary fw-semibold">
                    <i className="bi bi-list-task me-2"></i> Your Tasks
                </h5>
                {todos.length === 0 ? (
                    <p className="text-muted text-center mt-3">
                        <i className="bi bi-emoji-smile"></i> No tasks yet. Start adding some!
                    </p>
                ) : (
                    <ul className="list-group shadow-sm rounded">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="list-group-item d-flex justify-content-between align-items-center bg-light border-0 rounded mb-2 shadow-sm"
                                style={{ transition: "all 0.3s ease-in-out" }}
                            >
                                <span
                                    className="flex-grow-1 d-flex align-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleToggleTask(todo.id)}
                                >
                                    <i className={`bi ${todo.completed ? "bi-check-circle-fill text-success" : "bi-circle"} me-2`}></i>

                                    <span className={todo.completed ? "text-decoration-line-through text-muted" : "text-dark fw-medium"}>
                                        {todo.text}
                                    </span>

                                    {todo.completed && (
                                        <span className="ms-2 text-danger fw-bold text-decoration-none">
                                            (Uncheck the todo to perform actions)
                                        </span>
                                    )}
                                </span>

                                {editTaskId === todo.id ? (
                                    <button className="btn btn-sm btn-success me-2" onClick={handleSaveTask}>
                                        <i className="bi bi-check"></i>
                                    </button>
                                ) : (
                                    <button
                                        className={`btn btn-sm btn-outline-primary me-2 ${todo.completed ? "disabled" : ""}`}
                                        title="Edit Todo"
                                        onClick={() => handleEditTask(todo)}
                                        disabled={todo.completed}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                )}
                                <button
                                    className={`btn btn-sm btn-outline-danger shadow-sm ${todo.completed ? "disabled" : ""}`}
                                    title="Delete Todo"
                                    onClick={() => confirmDelete(todo.id)}
                                    disabled={todo.completed}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Custom Delete Confirmation Modal */}
            {isModalOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h5 style={modalStyles.title}>Confirm Deletion</h5>
                        <p style={modalStyles.message}>Are you sure you want to delete this task?</p>
                        <div style={modalStyles.footer}>
                            <button style={modalStyles.cancelButton} onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button style={modalStyles.deleteButton} onClick={handleDeleteTask}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
