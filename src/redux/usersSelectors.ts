import {createSelector} from "reselect";
import {AppStateType} from "./reduxStore";
import {UserType} from "../types/types";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}
const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
}
const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}
const getFollowingInProgressSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}


export const getUsers = createSelector(getUsersSelector,
    (users: Array<UserType>) => {
    return users;
})
export const getPageSize = createSelector(getPageSizeSelector,
    (pageSize: number) => {
    return pageSize;
})
export const getTotalUsersCount = createSelector(getTotalUsersCountSelector,
    (totalUsersCount: number) => {
    return totalUsersCount;
})
export const getCurrentPage = createSelector(getCurrentPageSelector,
    (currentPage: number) => {
    return currentPage;
})
export const getIsFetching = createSelector(getIsFetchingSelector,
    (isFetching: boolean) => {
    return isFetching;
})
export const getFollowingInProgress = createSelector(getFollowingInProgressSelector,
    (followingInProgress: Array<number>) => {
    return followingInProgress;
})

