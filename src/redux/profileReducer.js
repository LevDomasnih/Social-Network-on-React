import {ProfileAPI} from "../API/api"

const ADD_POST = 'my-app/profileReducer/ADD-POST'
const SET_USER_PROFILE = 'my-app/profileReducer/SET_USER_PROFILE'
const SET_STATUS = 'my-app/profileReducer/SET_STATUS'
const DELETE_POST = 'my-app/profileReducer/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 105},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Lol", likesCount: 5000},
        {id: 4, message: "Kek", likesCount: 9400},
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') return state;
            return {
                ...state,
                posts: [{id: state.posts.length + 1, message: action.newPost, likesCount: 0}, ...state.posts]
            };
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        case SAVE_PHOTO_SUCCESS:
            debugger
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state;
    }
}

export default profileReducer;

export const addPost = (newPost) => ({type: ADD_POST, newPost})
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = (userId) => async (dispatch) => {
    const response = await ProfileAPI.getUserProfile(userId)
    dispatch(setUsersProfile(response))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = (status) => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(status)
    if (response.resultCode !== 0) return
    dispatch(setStatus(status))
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await ProfileAPI.savePhoto(file)
    if (response.resultCode !== 0) return

    dispatch(savePhotoSuccess(response.data.photos))
}