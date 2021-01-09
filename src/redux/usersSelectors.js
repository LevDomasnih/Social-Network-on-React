import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users
}
const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize
}
const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount
}
const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage
}
const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching
}
const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress
}


export const getUsers = createSelector(getUsersSelector,
    (users) => {
    return users;
})
export const getPageSize = createSelector(getPageSizeSelector,
    (pageSize) => {
    return pageSize;
})
export const getTotalUsersCount = createSelector(getTotalUsersCountSelector,
    (totalUsersCount) => {
    return totalUsersCount;
})
export const getCurrentPage = createSelector(getCurrentPageSelector,
    (currentPage) => {
    return currentPage;
})
export const getIsFetching = createSelector(getIsFetchingSelector,
    (isFetching) => {
    return isFetching;
})
export const getFollowingInProgress = createSelector(getFollowingInProgressSelector,
    (followingInProgress) => {
    return followingInProgress;
})

