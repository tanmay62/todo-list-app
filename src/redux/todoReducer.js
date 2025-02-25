const initialState = { tasks: [] };

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return { ...state, tasks: action.payload };
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? { ...task, ...action.payload } : task
                ),
            };
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        default:
            return state;
    }
};

// Action creators
export const setTodos = (tasks) => ({ type: "SET_TODOS", payload: tasks });
export const addTask = (task) => ({ type: "ADD_TASK", payload: task });
export const toggleTask = (id) => ({ type: "TOGGLE_TASK", payload: id });
export const deleteTask = (id) => ({ type: "DELETE_TASK", payload: id });
export const updateTask = (updatedTask) => ({ type: "UPDATE_TASK", payload: updatedTask });


export default todoReducer;
