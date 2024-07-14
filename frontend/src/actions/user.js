import { FAIL_REGISTER_USER, REQUEST_LOGIN_USER, REQUEST_REGISTER_USER, SUCCESS_LOGIN_USER, SUCCESS_REGISTER_USER, FAIL_LOGIN_USER } from "../constants/user"
import * as api from "../api/user"

export const registerUser = (registerdata) => async (dispatch) => {

    try {
        dispatch({ type: REQUEST_REGISTER_USER })
        const { data } = await api.register(registerdata)
        dispatch({ type: SUCCESS_REGISTER_USER, payload: data.message })
    } catch (error) {
        dispatch({ type: FAIL_REGISTER_USER, payload: "Unable to register" })
    }
}

export const login = (logindata) => async (dispatch) => {

    try {
        dispatch({ type: REQUEST_LOGIN_USER })
        const { data } = await api.login(logindata)
        dispatch({ type: SUCCESS_LOGIN_USER, payload: data.user })
    } catch (error) {
        dispatch({ type: FAIL_LOGIN_USER, payload: "Unable to login" })
    }
} 