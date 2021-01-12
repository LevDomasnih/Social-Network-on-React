import {usersAPI} from "../API/api";

const FOLLOW = 'my-app/usersReducer/FOLLOW';
const UNFOLLOW = 'my-app/usersReducer/UNFOLLOW';
const SET_USERS = 'my-app/usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/usersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10, // users on page (rename)!!!
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}

export default usersReducer;

export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

export const unfollowUsers = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    const response = await usersAPI.unfollowUsers(userId)
    if (response.resultCode == 0) {
        dispatch(unfollow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const followUsers = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));

    const response = await usersAPI.followUsers(userId)
    if (response.resultCode == 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}