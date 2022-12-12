import {TOGGLE_NIGHTMODE} from "./types";

export const toggleNightModeAC = (toggle) => ({type: TOGGLE_NIGHTMODE, toggle})

const initialState = {
    nightMode: false
}


const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NIGHTMODE:
            return {
                ...state,
                nightMode: action.toggle
            }
        default : {
            return state
        }
    }
}

const changeNightMode = (action, dispatch) => dispatch(toggleNightModeAC(true))


export default settingsReducer