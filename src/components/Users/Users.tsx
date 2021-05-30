import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";
import User from "./User";
import {FilterType} from "../../redux/usersReducer";
import {UsersSearchForm} from "./UsersSearchForm";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollowUsers: (userId: number) => void
    followUsers: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize,
                                        onPageChanged, users, onFilterChanged, ...props}) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <div>
                <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                           pageSize={pageSize} onPageChanged={onPageChanged}/>
            </div>
            {users.map((user: UserType) => <User user={user} {...props} /> )}
        </div>
    )
}


export default Users;