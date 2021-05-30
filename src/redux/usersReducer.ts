import { UserType } from "../types/types"
import { BaseThunkType, InferActionTypes } from "./reduxStore"
import { usersAPI } from "../API/usersAPI"
import { ResponseType, ResultCodesEnum } from "../API/api"

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10, // users on page (rename)!!!
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export type usersStateType = typeof initialState
export type FilterType = typeof initialState.filter

type ActionsTypes = ActionTypes


const usersReducer = (state = initialState, action: ActionsTypes): usersStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                }),
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                }),
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        }
        case "SET_USERS": {
            return { ...state, users: action.users }
        }
        case "SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "TOGGLE_IS_FETCHING": {
            return { ...state, isFetching: action.isFetching }
        }
        case "SET_FILTER":
            return {...state, filter: action.payload}
        default:
            return state
    }
}

export default usersReducer

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    follow: (userId: number) => ({ type: "FOLLOW", userId } as const),
    unfollow: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setFilter: (filter: FilterType) => ({ type: "SET_FILTER", payload: filter } as const),
    setCurrentPage: (currentPage: number) => ({
        type: "SET_CURRENT_PAGE",
        currentPage,
    } as const),
    setTotalUsersCount: (count: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        count,
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: "TOGGLE_IS_FETCHING",
        isFetching,
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching,
        userId,
    } as const),
}

type ThunkType = BaseThunkType<ActionsTypes>

export const requestUsers = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(pageNumber))
    dispatch(actions.setFilter(filter))

    const response = await usersAPI.getUsers(pageNumber, pageSize, filter.term, filter.friend)

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(response.items))
    dispatch(actions.setTotalUsersCount(response.totalCount))
}

export const unfollowUsers = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    const response = await usersAPI.unfollowUsers(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.unfollow(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const followUsers = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    const response: ResponseType = await usersAPI.followUsers(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.follow(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}