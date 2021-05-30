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
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string };
const Users: React.FC<PropsType> = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsers)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : (parsed.friend == 'true')}

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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