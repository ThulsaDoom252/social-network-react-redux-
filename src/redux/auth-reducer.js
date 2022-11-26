import {login, loginApi} from "../api/api";
import {setAvatarTC} from "./profile-reducer";
import {
    API_KEY,
    DELETE,
    FAKE,
    FALSY_DATA,
    GET_CAPTCHA,
    LOG_STATUS,
    LOGIN_FETCH,
    PRE_LOG_STATUS,
    SET_MY_DATA
} from "./types";

//ACTION CREATORS
export const AuthAC = (id, email, login, api) => ({type:  SET_MY_DATA, data: {id, email, login}})
export const loggerAC = (isLogged) => ({type: LOG_STATUS, isLogged})
export const falsyAC = (action) => ({type: FALSY_DATA, action})
export const captchaAc = (get) => ({type: GET_CAPTCHA, get})
export const loginFetchAC = (isFetch) => ({type: LOGIN_FETCH, isFetch})
export const apiKeyAC = (action) => ({type: API_KEY, action})
export const preLoggedAC = (isPreLogged) => ({type: PRE_LOG_STATUS, isPreLogged})

//STATE
const initialState = {
    id: null,
    apiKey: false,
    email: null,
    login: null,
    preLogged: false,
    isLogged: false,
    error: false,
    captcha: null,
    fetching: false,
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

        case PRE_LOG_STATUS:
            return {
                ...state, preLogged: action.isPreLogged
            }

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
        case  FAKE :
            return {
                ...state,
                isLogged: true,
                id: 23631,
                email: 'xenolm252@gmail.com',
                name: 'ThulsaDoom252',
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

        case API_KEY :
            return  {
                ...state,
                apiKey: action.action
            }

    }
}

window.rem0  = initialState.fetching
window.rem1 = initialState.preLogged

export const changeApiKey = (dispatch, key) => {
        localStorage.setItem("apiKey", key)
        dispatch(loggerAC(true))
}

//THUNKS
export const loginTC = () => (dispatch) => {
    return login.auth().then(data => {
        const {id, email, login} = data.data
        if (data.resultCode === 0) {
            dispatch(AuthAC(id, email, login))
            dispatch(preLoggedAC(true))
            dispatch(falsyAC(false))
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


export const mainLoginTC = (email, password, rememberMe, antiBotSymbols, key) => {
    return async (dispatch) => {
        await dispatch(loginFetchAC(true))
        const data =
            await loginApi.login(email, password, rememberMe, antiBotSymbols)
        if (data.resultCode === 0) {
            dispatch(loginTC())
            dispatch(loginFetchAC(false))
        } else if (data.resultCode === 1) {
            dispatch(falsyAC(true))
            dispatch(loginFetchAC(false))
        } else if (data.resultCode === 10) {
            dispatch(getCaptchaTC())
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