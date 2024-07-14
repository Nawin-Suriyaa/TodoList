import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { createTask, deleteTask, getTasks, updateTask } from "../reducers/tasks";
import { login, register } from "../reducers/user";

const reducers = combineReducers({
    tasks:getTasks,
    updateTask :updateTask,
    deleteTask : deleteTask,
    createTask : createTask,
    user : login,
    registerUser:register
})

const initalState = {};

const store = createStore(reducers,initalState,applyMiddleware(thunk))

export default store;