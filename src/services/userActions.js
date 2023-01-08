import { baseURL } from "../api/api";
import { getCookie, setCookie } from "../utils/cookies";
import { request, requestWithRefresh } from "../utils/request";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const login = (email, password) => {

    const requestUrl = baseURL + "/auth/login";

    return function(dispatch) {

        dispatch({
            type: LOGIN_REQUEST
        })

        request(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email, 'password': password })
        })
            .then( (responseData) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: responseData.data
                });
                sessionStorage.setItem('refreshToken', responseData.refreshToken);
                let authToken;
                authToken = responseData.accessToken.split('Bearer ')[1];
                if (authToken) {
                    setCookie('accessToken', authToken );
                }
            })
            .catch( (error) => {
                dispatch({
                    type: LOGIN_ERROR
                })
                alert("Ошибка при логине: " + error)
            });

    }

}

export const register = (email, password, name) => {

    const requestUrl = baseURL + "/auth/register";

    return function(dispatch) {

        dispatch({
            type: REGISTER_REQUEST
        })

        request(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email, 'password': password, 'name': name })
        })
            .then( (responseData) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: responseData.data
                })
            })
            .catch( (error) => {
                dispatch({
                    type: REGISTER_ERROR
                })
                alert("Ошибка при регистрации: " + error)
            });

    }

}

export const refreshToken = () => {

    const requestUrl = baseURL + "/auth/token";

    return function(dispatch) {

        dispatch({
            type: REFRESH_TOKEN_REQUEST
        })

        request(requestUrl)
            .then( (responseData) => {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: responseData.data
                })
            })
            .catch( (error) => {
                dispatch({
                    type: REFRESH_TOKEN_ERROR
                })
                alert("Ошибка при обновлении токена: " + error)
            });

    }

}

export const forgotPassword = (email) => {

    const requestUrl = baseURL + "/password-reset";

    return function(dispatch) {

        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        request(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email })
        })
            .then( (responseData) => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                })
            })
            .catch( (error) => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR
                })
                alert("Ошибка при запросе на восстановление пароля: " + error)
            });

    }

}

export const resetPassword = (newPassword, resetPasswordCode) => {

    const requestUrl = baseURL + "/password-reset/reset";

    return function(dispatch) {

        dispatch({
            type: RESET_PASSWORD_REQUEST
        })

        request(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'password': newPassword, 'token': resetPasswordCode })
        })
            .then( (responseData) => {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                })
            })
            .catch( (error) => {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                })
                alert("Ошибка при восстановлении пароля: " + error)
            });

    }

}

export const logout = () => {

    const requestUrl = baseURL + "/auth/logout";

    return function(dispatch) {

        dispatch({
            type: LOGOUT_REQUEST
        })

        request(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'token': sessionStorage.getItem('refreshToken') ?? '' })
        })
            .then( (responseData) => {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
            .catch( (error) => {
                dispatch({
                    type: LOGOUT_ERROR
                })
                alert("Ошибка при выходе из системы: " + error)
            });

    }

}

export const getUser = () => {

    const requestUrl = baseURL + "/auth/user";

    return function(dispatch) {

        dispatch({
            type: GET_USER_REQUEST
        })

        requestWithRefresh(requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCookie('accessToken')
            },
        })
            .then( (responseData) => {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: responseData.user
                })
            })
            .catch( (error) => {
                dispatch({
                    type: GET_USER_ERROR
                })
                alert("Ошибка загрузки пользователя: " + error)
            });

    }

}

export const updateUser = (name, email, password) => {

    const requestUrl = baseURL + "/auth/user";

    return function(dispatch) {

        dispatch({
            type: UPDATE_USER_REQUEST
        })

        requestWithRefresh(requestUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({ 'name': name, 'email': email, 'password': password })
        })
            .then( (responseData) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: responseData.user
                })
            })
            .catch( (error) => {
                dispatch({
                    type: UPDATE_USER_ERROR
                })
                alert("Ошибка обновления пользователя: " + error)
            });

    }

}
