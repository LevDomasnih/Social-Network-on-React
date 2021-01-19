import {usersAPI} from "../API/api";
import {UserType} from "../types/types";

const FOLLOW = 'my-app/usersReducer/FOLLOW';
const UNFOLLOW = 'my-app/usersReducer/UNFOLLOW';
const SET_USERS = 'my-app/usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'my-app/usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'my-app/usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'my-app/usersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10, // users on page (rename)!!!
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
}
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type FollowCreatorActionType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): FollowCreatorActionType => ({type: FOLLOW, userId});
type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): UnfollowActionType => ({type: UNFOLLOW, userId});
type SetUsersCreatorActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersCreatorActionType => ({type: SET_USERS, users});
type SetCurrentPageCreatorActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageCreatorActionType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountCreatorActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountCreatorActionType => ({type: SET_TOTAL_USERS_COUNT, count});
type ToggleIsFetchingCreatorActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingCreatorActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleFollowingProgressCreatorActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressCreatorActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

export const unfollowUsers = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));

    const response = await usersAPI.unfollowUsers(userId)
    if (response.resultCode == 0) {
        dispatch(unfollow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const followUsers = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));

    const response = await usersAPI.followUsers(userId)
    if (response.resultCode == 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}