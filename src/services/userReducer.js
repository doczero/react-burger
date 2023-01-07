import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
        REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
        REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR,
        FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR,
        RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
        LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR
    } from "./userActions";

const initialState = {
    userName: null,
    userLogin: null,
    isAuthenticated: false
}

export const userReducer = (state = initialState, action ) => {

    switch(action.type) {

        case LOGIN_REQUEST: {
            return {
                ...state,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
            }
        }

        case LOGIN_ERROR: {
            return {
                ...state,
            }
        }

        case REGISTER_REQUEST: {
            return {
                ...state,
            }
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
            }
        }

        case REGISTER_ERROR: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_ERROR: {
            return {
                ...state,
            }
        }

        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
            }
        }

        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
            }
        }

        case LOGOUT_REQUEST: {
            return {
                ...state,
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                userName: null,
                userLogin: null,
                isAuthenticated: false
            }
        }

        case LOGOUT_ERROR: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
            }
        }

        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
            }
        }

        default:
            return state;

    }

}
