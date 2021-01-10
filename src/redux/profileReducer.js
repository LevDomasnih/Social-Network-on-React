import {ProfileAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


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
        default:
            return state;
    }
}

export default profileReducer;
export const addPost = (newPost) => ({type: ADD_POST, newPost});
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId})


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