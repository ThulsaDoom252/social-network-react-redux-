import {apiCaller, profileApi} from "../api/api";
import {
    ADD_POST,
    CURRENT_PROFILE, DATA_RECEIVED,
    ERROR_MESSAGE,
    IS_FETCHING,
    SET_AVATAR,
    SET_NOTFOUND,
    SET_PHOTO, SET_RESULT, SET_STATUS,
    SET_USER_PROFILE, STATUS_ERROR
} from "./types";


//ACTIONS
export const dataReceivedAC = (success) => ({type: DATA_RECEIVED, success})
export const statusErrorAC = (error) => ({type: STATUS_ERROR, error})
export const resultAC = (result) => ({type: SET_RESULT, result})
export const notFoundAC = (notFound) => ({type: SET_NOTFOUND, notFound})
export const photoAC = (photo) => ({type: SET_PHOTO, photo})
export const avatarAC = (avatar) => ({type: SET_AVATAR, avatar})
export const fetchingAC = (isIt) => ({type: IS_FETCHING, isIt})
export const addPostCreator = (post) => ({type: 'ADD-POST', post})
export const setUserProfile = (profile) => ({type: 'SET_USER_PROFILE', profile})
export const statusAC = (status) => ({type: 'SET_STATUS', status})
export const currentUserDataAC = (name, about, applicant, description, github, vk, facebook, instagram, twitter, site, youtube, link) =>
    ({
        type: CURRENT_PROFILE,
        name,
        about,
        applicant,
        description,
        github,
        vk,
        facebook,
        instagram,
        twitter,
        site,
        youtube,
        link
    })

//STATE
const initialState = {
    posts: [
        {message: 'Hi, how are ayou?', likesCount: 15},
        {message: 'It is my first post', likesCount: 20}
    ],
    avatar: null,
    profile: null,
    currentUserAvatar: null,
    name: null,
    about: null,
    applicant: null,
    description: null,
    github: null,
    vk: null,
    facebook: null,
    instagram: null,
    twitter: null,
    site: null,
    youtube: null,
    link: null,
    dataReceived: false,
    status: '',
    isFetching: false,
    result: null,
    errorMessage: null,
    notFound: null,
    statusError: null
}

//REDUCER
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PROFILE: {
            return {
                ...state,
                name: action.name,
                about: action.about,
                applicant: action.applicant,
                description: action.description,
                github: action.github,
                vk: action.vk,
                facebook: action.facebook,
                instagram: action.instagram,
                twitter: action.twitter,
                site: action.site,
                youtube: action.youtube,
                link: action.link,
            }
        }

        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }

        }


        case ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.message
            }
        }

        case SET_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            }

        case IS_FETCHING :
            return {
                ...state,
                isFetching: action.isIt
            }

        case SET_NOTFOUND :
            return {
                ...state,
                notFound: action.notFound
            }

        case SET_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photo}}

        case DATA_RECEIVED: {
            return {
                ...state,
                dataReceived: action.success
            }

        }
        case STATUS_ERROR: {
            return {
                ...state,
                statusError: action.error
            }

        }
        case  SET_STATUS:
            return {
                ...state, status: action.status
            }

        case SET_RESULT:
            return {
                ...state,
                result: action.result
            }

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {message: action.post, likesCount: 0}],
            }
        default:
            return state
    }
}

//THUNKS
export const setUserTC = (userId) => {
    return async (dispatch) => {
        try {
            const data = await apiCaller.setUsers(userId)
            dispatch(setUserProfile(data))
            dispatch(notFoundAC(false))
        } catch (error) {
            dispatch(notFoundAC(true))
        }

    }
}

export const getStatusTC = (userId) => async (dispatch) => {
    const response = await profileApi.getStatus(userId)
    dispatch(statusAC(response.data)
    )

}

export const updateStatusTC = (status) => async (dispatch) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(statusAC(status))
        dispatch(statusErrorAC(false))
    } else {
        dispatch(statusErrorAC(true))
        setTimeout(() => {
            dispatch(statusErrorAC(false))
        }, 3000)
    }
}

export const currentUserDataTC = (userId) => async (dispatch) => {
    const data = await profileApi.getCurrentUser(userId)
    dispatch(currentUserDataAC(data.fullName, data.aboutMe, data.lookingForAJob, data.lookingForAJobDescription,
            data.contacts.github, data.contacts.vk, data.contacts.facebook, data.contacts.instagram, data.contacts.twitter,
            data.contacts.website, data.contacts.youtube, data.contacts.mainLink),
        dispatch(dataReceivedAC(true))
    )
}


export const setAvatarTC = (userId) => async (dispatch) => {
    const data = await profileApi.getCurrentUser(userId)
    dispatch(avatarAC(data.photos.small))
}

export const updatePhotoTC = (photo) => async (dispatch) => {
    const response = await profileApi.updatePhoto(photo)

    if (response.data.resultCode === 0) {
        dispatch(photoAC(response.data.data.photos))
        dispatch(avatarAC(response.data.data.photos.small))

    }
}

export const updateProfileTC = (userid, about, applicant, description,
                                name, git, vk, fb, inst, twit,
                                web, youtube, link) => async (dispatch) => {

    const response = await profileApi.updateProfile(userid, about, applicant, description,
        name, git, vk, fb, inst, twit,
        web, youtube, link)
    if (response.data.resultCode === 0) {
        dispatch(fetchingAC(false))
        dispatch(resultAC('success'))
        setTimeout(() => {
            dispatch(resultAC(null))
        }, 2000)
    } else {
        dispatch(fetchingAC(false))
        dispatch(resultAC('error'))
        setTimeout(() => {
            dispatch(resultAC(null))
        }, 2000)
    }
}

export default profileReducer

