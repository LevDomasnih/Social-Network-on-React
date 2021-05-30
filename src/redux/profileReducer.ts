import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {ProfileAPI} from "../API/profileAPI";

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 105},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Lol", likesCount: 5000},
        {id: 4, message: "Kek", likesCount: 9400},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

type ActionsTypes = ActionType
type profileReducerType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): profileReducerType => {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts: [{id: state.posts.length + 1, message: action.newPostText, likesCount: 0}, ...state.posts]
            };
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile};
        case "SET_STATUS":
            return {...state, status: action.status};
        case "DELETE_POST":
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        case "SAVE_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

export default profileReducer;

type ActionType = InferActionTypes<typeof actions>

export const actions = {
    addPost: (newPostText: string) => ({type: "ADD_POST", newPostText} as const),
    setUsersProfile: (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SET_STATUS", status} as const),
    deletePost: (postId: number) => ({type: "DELETE_POST", postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: "SAVE_PHOTO_SUCCESS", photos} as const),
}


type ThunkType = BaseThunkType<ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.getUserProfile(userId)
    dispatch(actions.setUsersProfile(response))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.getStatus(userId)
    dispatch(actions.setStatus(response))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(status)
    if (response.resultCode !== 0) return
    dispatch(actions.setStatus(status))
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const response = await ProfileAPI.savePhoto(file)
    if (response.resultCode !== 0) return

    dispatch(actions.savePhotoSuccess(response.data.photos))
}