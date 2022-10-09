import {loginTC} from "./auth-reducer";
import {NIGHTMODE_RELAY, SET_INITIALIZATION, SWITCH_CONSTRUCTION} from "./types";

//ACTION CREATORS
export const initializeAC = () => ({type: SET_INITIALIZATION})
export const underConstructionAC = (show) => ({type: SWITCH_CONSTRUCTION, show})
export const nightModeAC = (relay) => ({type: NIGHTMODE_RELAY, relay})

//INITIAL STATE
let initialState = {
    initialized: false,
    underConstruction: true,
    nightMode: false,
    nightModeColors: {
        "sidebar/header-background": "#0B18DCFF",
        "nightMode-text-color": "#e3cfcf",
        "nightMode-profile-buttons-text-color": "#5e5353",
        "nightMode-border-color": "#a8a3a3",
        "sidebar-item/header-burger-item-active": "#ffffff",
        "content-background": "#6B5F5FFF",
        "profile-header": "#2A4670FF",
        "nightMode-container-block": "#0D4570FF",
        "profile-block-border-shadow": "inset 6px 6px 6px #888686, inset -6px -6px 6px #a8a3a3",
        "wrapper-background": "#111111",
        "header-slogan-title/welcome-label": "#6b8dd2",
        "header-slogan-text/user-name": "#fff8f8",
        "header-buttons-color": "#fdf7f7",
        "header-burger-button-color": "#fdf7f7",
        "header-burger-menu": "#296069",
        "sidebar-item/header-burger-item": "#c6dae3",
    },
}

//REDUCER
let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZATION:
            return {
                ...state,
                initialized: true
            }
        default:
            return state

        case SWITCH_CONSTRUCTION :
            return {
                ...state,
                underConstruction: action.show
            }

        case NIGHTMODE_RELAY:
            return {
                ...state,
                nightMode: action.relay
            }

    }
}

//THUNK
export const initializeTC = () => (dispatch) => {
    let promise = dispatch(loginTC())
    Promise.all([promise]).then(() => {
        dispatch(initializeAC())
    })
}

export default appReducer