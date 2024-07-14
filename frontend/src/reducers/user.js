import { CLEAR } from "../constants/tasks";
import { FAIL_LOGIN_USER, FAIL_REGISTER_USER, REQUEST_LOGIN_USER, REQUEST_REGISTER_USER, SUCCESS_LOGIN_USER, SUCCESS_REGISTER_USER } from "../constants/user";


export const register = (state={},action) =>{

    switch(action.type){
        case REQUEST_REGISTER_USER:
            return {
                loading : true
            }
        case SUCCESS_REGISTER_USER :
            return {
                loading : false,
                message : action.payload
            }
        case FAIL_REGISTER_USER:
            return {
                loading : false,
                error : action.payload
            }
        case CLEAR :
            return {
                ...state,
                error : null,
            }
        default:
            return state;
    }
}

export const login = (state = {user:{}},action) =>{

    switch(action.type){
        
        case REQUEST_LOGIN_USER:
            return {
                loading : true
            }
        case SUCCESS_LOGIN_USER:
            return {
                loading : false,
                user : action.payload
            }
        case FAIL_LOGIN_USER:
            return{
                loading :false,
                error : action.payload
            }
        case CLEAR :
            return {
            ...state,
            error : null
        }
        default:{
            return  state;
        }
    }
}