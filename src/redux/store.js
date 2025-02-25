import { legacy_createStore as createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";
import notifyReducer from "./notifyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  notifications: notifyReducer
});

const store = createStore(rootReducer);

export default store;