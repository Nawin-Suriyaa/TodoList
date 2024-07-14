import { CLEAR, FAIL_CREATE_TASK, FAIL_GET_TASKS, REQUEST_CREATE_TASK, REQUEST_GET_TASKS, SUCCESS_CREATE_TASK, SUCCESS_GET_TASKS,SUCCESS_UPDATE_TASK,REQUEST_UPDATE_TASK,FAIL_UPDATE_TASK,SUCCESS_DELETE_TASK,REQUEST_DELETE_TASK,FAIL_DELETE_TASK } from "../constants/tasks";


export const createTask = (state={},action) =>{

    switch(action.type){
        case REQUEST_CREATE_TASK:
            return {
                loading:true
            }
        case SUCCESS_CREATE_TASK:
            return{
                loading : false,
                message : action.payload
            }
        case FAIL_CREATE_TASK:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR :
            return {
                error : null,
                message : null
            }
        default :
            return state;
    }
}

export const getTasks = (state = {tasks :[]},action) =>{

    switch(action.type){
        case REQUEST_GET_TASKS:
            return {
                loading:true
            }
        case SUCCESS_GET_TASKS:
            return{
                loading : false,
                tasks : action.payload
            }
        case FAIL_GET_TASKS:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR :
            return {
                error : null,
            }
        default :
            return state;
    }
}

export const updateTask = (state={},action) =>{
    switch(action.type){
        case REQUEST_UPDATE_TASK:
            return {
                loading:true
            }
        case SUCCESS_UPDATE_TASK:
            return{
                loading : false,
                message : action.payload
            }
        case FAIL_UPDATE_TASK:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR :
            return {
                error : null,
                message : null
            }
        default:
            return state;
    }
}

export const deleteTask = (state={},action) =>{
    switch(action.type){
        case REQUEST_DELETE_TASK:
            return {
                loading:true
            }
        case SUCCESS_DELETE_TASK:
            return{
                loading : false,
                message : action.payload
            }
        case FAIL_DELETE_TASK:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR :
            return {
                error : null,
                message : null
            }
        default:
            return state;
    }
}