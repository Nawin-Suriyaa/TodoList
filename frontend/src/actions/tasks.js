import * as api from "../api/task"


const { REQUEST_CREATE_TASK, SUCCESS_CREATE_TASK, FAIL_CREATE_TASK, REQUEST_GET_TASKS, SUCCESS_GET_TASKS, FAIL_GET_TASKS, REQUEST_UPDATE_TASK, SUCCESS_UPDATE_TASK, FAIL_UPDATE_TASK, REQUEST_DELETE_TASK, SUCCESS_DELETE_TASK, FAIL_DELETE_TASK } = require("../constants/tasks")

export const createTask = (id, task) => async (dispatch) => {

    try {
        dispatch({ type: REQUEST_CREATE_TASK })

        const { data } = await api.createTask(id, task)
        dispatch({ type: SUCCESS_CREATE_TASK, payload: data.message })

    } catch (error) {
        dispatch({ type: FAIL_CREATE_TASK, payload: "Unable to create task" })
    }
}

export const getTasks = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_GET_TASKS });

        const { data } = await api.getTasks(id);
        dispatch({ type: SUCCESS_GET_TASKS, payload: data.tasks })
    } catch (error) {
        dispatch({ type: FAIL_GET_TASKS, payload: "Unable to fetch tasks" })
    }
}

export const updatedTask = (id, updatedata) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_UPDATE_TASK });
        const { data } = await api.updatedTask(id, updatedata);
        dispatch({ type: SUCCESS_UPDATE_TASK, payload: data.message });
    } catch (error) {
        dispatch({ type: FAIL_UPDATE_TASK, payload: "Unable to update the task" })
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_DELETE_TASK })
        const { data } = await api.deleteTask(id);
        dispatch({ type: SUCCESS_DELETE_TASK, payload: data.message })
    } catch (error) {
        dispatch({ type: FAIL_DELETE_TASK, payload: "Unable to delete the task" })
    }
}