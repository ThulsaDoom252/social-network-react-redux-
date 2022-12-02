import {login, loginApi} from "../api/api";
import {setAvatarTC} from "./profile-reducer/profile-reducer";

import {
    ERROR_CODE_MESSAGE,
    DELETE,
    FALSY_DATA,
    GET_CAPTCHA,
    LOG_STATUS,
    LOGIN_FETCH,
    SET_MY_DATA
} from "./types";

//ACTION CREATORS
export const AuthAC = (id, email, login, api) => ({type: SET_MY_DATA, data: {id, email, login}})
export const loggerAC = (isLogged) => ({type: LOG_STATUS, isLogged})
export const errorAC = (action) => ({type: FALSY_DATA, action})
export const captchaAc = (get) => ({type: GET_CAPTCHA, get})
export const loginFetchAC = (isFetch) => ({type: LOGIN_FETCH, isFetch})
export const errorMessageAC = (message) => ({type: ERROR_CODE_MESSAGE, message})

//STATE
const initialState = {
    id: null,
    email: null,
    login: null,
    isLogged: false,
    error: false,
    captcha: null,
    fetching: false,
    errorMessage: null,
}

//REDUCER
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_DATA:
            return {
                ...state,
                id: action.data.id,
                email: action.data.email,
                login: action.data.login,

            }
        default:
            return state


        case LOG_STATUS :
            return {
                ...state, isLogged: action.isLogged
            }

        case LOGIN_FETCH :
            return {
                ...state,
                fetching: action.isFetch
            }

        case GET_CAPTCHA :
            return {
                ...state,
                captcha: action.get
            }

        case DELETE :
            return {
                ...state,
                isLogged: false,
                id: null,
                email: null,
                name: null
            }

        case FALSY_DATA :
            return {
                ...state,
                error: action.action
            }

        case ERROR_CODE_MESSAGE: {
            return {
                ...state,
                errorMessage: action.message
            }
        }

    }
}

export const changeApiKeyTC = (key) => {
    return (dispatch) => {
        localStorage.setItem("apiKey", key)
        dispatch(loggerAC(true))
    }
}

//THUNKS
export const loginTC = () => (dispatch) => {
    return login.auth().then(data => {
        const {id, email, login} = data.data
        if (data.resultCode === 0) {
            dispatch(AuthAC(id, email, login))
            dispatch(loggerAC(true))
            dispatch(errorAC(false))
            dispatch(setAvatarTC(id))
        } else {
            dispatch(loggerAC(false))
        }
    })
}

export const getCaptchaTC = () => {
    return async (dispatch) => {
        const response = await loginApi.getCaptcha()
        dispatch(captchaAc(response.data.url))
    }
}


export const mainLoginTC = (email, password, rememberMe, antiBotSymbols) => {
    return async (dispatch) => {
        await dispatch(loginFetchAC(true))
        const data =
            await loginApi.login(email, password, rememberMe, antiBotSymbols)
        debugger
        if (data.resultCode === 0) {
            dispatch(loginTC())
            dispatch(errorAC(false))
            dispatch(errorMessageAC(null))
            dispatch(loginFetchAC(false))
            dispatch(captchaAc(null))
        } else if (data.resultCode === 1) {
            dispatch(errorAC(true))
            dispatch(errorMessageAC(data.messages[0]))
            dispatch(loginFetchAC(false))
        } else if (data.resultCode === 10) {
            dispatch(getCaptchaTC())
            dispatch(errorAC(true))
            dispatch(errorMessageAC(data.messages[0]))
            dispatch(loginFetchAC(false))
        }
    }
}

export const logOutTC = () => {
    return async (dispatch) => {
        const data = await loginApi.logout()
        if (data.resultCode === 0) {
            dispatch(loginTC())
        }
    }
}

export default authReducer