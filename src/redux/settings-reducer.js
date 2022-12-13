import {DIRECT_EDITMODE, TOGGLE_NIGHTMODE, TOGGLE_WALL,} from "./types";

export const toggleNightModeAC = (toggle) => ({type: TOGGLE_NIGHTMODE, toggle})
export const directEditModeAC = (toggle) => ({type: DIRECT_EDITMODE, toggle})
export const toggleWallAC = (toggle) => ({type: TOGGLE_WALL, toggle})

const initialState = {
    nightMode: false,
    directEditMode: true,
    showFakeModules: true,
    hideProfileWall: false,
}


const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NIGHTMODE:
            return {
                ...state,
                nightMode: action.toggle
            }

        case DIRECT_EDITMODE:
            return {
                ...state,
                directEditMode: action.toggle
            }

        case TOGGLE_WALL:
            return {
                ...state,
                hideProfileWall: action.toggle
            }
        default : {
            return state
        }
    }
}


export default settingsReducer