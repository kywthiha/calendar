import axiosInstance from "../axiosInstance";
import { LOGIN } from "../constants/actionTypes";
import { handleError, setToken } from "../helper";

export function login(email, password) {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password })
            setToken(response.data.data.token)
            dispatch({ type: LOGIN, payload: response.data.data });
        } catch (e) {
            dispatch({ type: LOGIN, payload: { errors: handleError(e) } });
            throw new Error(e)
        }
    }
} 