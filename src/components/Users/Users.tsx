import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";
import User from "./User";
import {FilterType, requestUsers} from "../../redux/usersReducer";
import {UsersSearchForm} from "./UsersSearchForm";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";

type PropsType = {}

const Users: React.FC<PropsType> = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUsers = (userId: number) => {
        dispatch(followUsers(userId))
    }

    const unfollowUsers = (userId: number) => {
        dispatch(unfollowUsers(userId))
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div>
                <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                           pageSize={pageSize} onPageChanged={onPageChanged}/>
            </div>
            {users.map((user: UserType) => (
                <User
                    user={user} key={user.id}
                    followUsers={followUsers}
                    unfollowUsers={unfollowUsers}
                    followingInProgress={followingInProgress}
                />
            ))}
        </div>
    )
}


export default Users;