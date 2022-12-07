import {ADD_MESSAGE, CLEAR_RANDOM_USERS, SET_RANDOM_USERS} from "./types";
import {apiCaller} from "../api/api";
import defaultAvatar from "./common/default-avatar.jfif"

//ACTION CREATORS
export const addMessageCreator = (message) => ({type: ADD_MESSAGE, message})
export const setRandomUsersAC = (randomUsers) => ({type: SET_RANDOM_USERS, randomUsers})
export const clearRandomUsersAC = () => ({type: CLEAR_RANDOM_USERS})

//STATE
const initialState = {
    defaultAvatar: defaultAvatar,
    randomUsers: [],
    underConstruction: true
}

//REDUCER
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RANDOM_USERS:
            return {
                ...state,
                randomUsers: [...action.randomUsers]
            }
        default:
            return state
    }

}

function getRandomPage(max) {
    return Math.floor(Math.random() * max);
}

export const getRandomUsersTC = () => {
    return async (dispatch) => {
        const randomPage = getRandomPage(4000)
        const data = await apiCaller.getRandomUsers(randomPage, 5)
        dispatch(setRandomUsersAC(data.items))
    }
}

export default dialogsReducer