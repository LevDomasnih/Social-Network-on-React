import {ProfileAPI} from "../API/api";


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 105},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Lol", likesCount: 5000},
        {id: 4, message: "Kek", likesCount: 9400},
    ],
    newPostText: '',
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') return state;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 5, message: state.newPostText, likesCount: 0}]
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            };
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        default:
            return state;
    }
}

export default profileReducer;
export const addPostActionCreator = () => ({type: ADD_POST});
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => (dispatch) => {
    ProfileAPI.getUserProfile(userId)
        .then(data => {
            dispatch(setUsersProfile(data));
        })
}

export const getStatus = (userId) => (dispatch) => {
    ProfileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data));
        })
}

export const updateStatus = (status) => (dispatch) => {
    ProfileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode !== 0) return;
            dispatch(setStatus(status));
        })
}