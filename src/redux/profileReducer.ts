import {ProfileAPI} from "../API/api"
import {PostType, ProfileType, PhotosType} from "../types/types";

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: any) => {
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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

export default profileReducer;

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await ProfileAPI.getUserProfile(userId)
    dispatch(setUsersProfile(response))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await ProfileAPI.updateStatus(status)
    if (response.resultCode !== 0) return
    dispatch(setStatus(status))
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await ProfileAPI.savePhoto(file)
    if (response.resultCode !== 0) return

    dispatch(savePhotoSuccess(response.data.photos))
}