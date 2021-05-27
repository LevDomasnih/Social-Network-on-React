import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";
import User from "./User";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollowUsers: (userId: number) => void
    followUsers: (userId: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize,
                                        onPageChanged, users, ...props}) => (
    <div>
        <div>
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}/>
        </div>
        {users.map((user: UserType) => <User user={user} {...props} /> )}
    </div>
)

export default Users;