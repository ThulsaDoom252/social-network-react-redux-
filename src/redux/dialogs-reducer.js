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
    dialogs: [
        {id: 1, name: 'Vladimir'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Viktor'},
        {id: 4, name: 'Dasha'},
        {id: 5, name: 'Valera'}
    ],
    messages: [
        {content: 'HI'},
        {content: 'Hey'},
        {content: 'Whats ap?'},
        {content: 'I like you'},
        {content: 'Lets go f or a ride'}

    ],
    underConstruction: true
}

//REDUCER
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {content: action.message}]
            }
        case SET_RANDOM_USERS:
            return  {
                ...state,
                randomUsers: [...action.randomUsers]
            }
        case CLEAR_RANDOM_USERS:
            return {
                ...state,
                randomUsers: [...[]]
            }
        default:
            return state
    }

}

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


export const getRandomUsersTC = ()  => {
    return async (dispatch) => {
        const randomPage = getRandomInt(4000)
        const data = await apiCaller.getRandomUsers(randomPage)
        dispatch(setRandomUsersAC(data.items))
    }
}

export default dialogsReducer