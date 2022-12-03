import {apiCaller} from "../api/api";
import {FETCH, FOLLOW, FOLLOWING_PROGRESS, SET_PAGE, SET_USERS, UNFOLLOW} from "./types";

//ACTION CREATORS
export const follow = (userid) => ({type: FOLLOW, userid})
export const unFollow = (userid) => ({type: UNFOLLOW, userid})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_PAGE, currentPage})
export const fetchingRelay = (isFetching) => ({type: FETCH, isFetching})
export const followingProgressRelay = (isFetching, userId) => ({type: FOLLOWING_PROGRESS, isFetching, userId})

//STATE
const initialState = {
    users: [],
    pageSize: 10,
    totalCount: 19607,
    currentPage: 2,
    isFetching: true,
    followingProgress: []
}

//REDUCERS
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return {...u, isFollow: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userid) {
                        return {...u, isFollow: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]}

        case FETCH:
            return {...state, isFetching: action.isFetching}

        case SET_PAGE:
            return {...state, currentPage: action.currentPage}

        case FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//THUNKS
export const followTC = (userid) => {
    return async (dispatch) => {
        dispatch(followingProgressRelay(true, userid))
        const data = await apiCaller.follow(userid)
        if (data.resultCode === 0) {
            dispatch(follow(userid))
        }
        dispatch(followingProgressRelay(false, userid))
    }
}

export const unFollowTC = (userid) => {
    return async (dispatch) => {
        dispatch(followingProgressRelay(true, userid))
        const data = await apiCaller.unFollow(userid)
        if (data.resultCode === 0) {
            dispatch(unFollow(userid))
        }
        dispatch(followingProgressRelay(false, userid))
    }
}

export const getUsersTC = (thisPage, pageSize) => {
    return async (dispatch) => {
        dispatch(fetchingRelay(true))
        const data = await apiCaller.getUsers(thisPage, pageSize)
        dispatch(fetchingRelay(false))
        dispatch(setUsers(data.items))
        dispatch(setCurrentPage(thisPage))

    }
}


export default userReducer














