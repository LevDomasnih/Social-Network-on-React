import React, {CSSProperties, FC, useEffect} from 'react';
import {UserType} from "../../types/types";
import User from "./User";
import {FilterType, followUsers, requestUsers, unfollowUsers} from "../../redux/usersReducer"
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
import {useHistory} from 'react-router-dom';
import * as queryString from "querystring";
import {Pagination} from "antd";

type PropsType = {}

export type QueryParamsType = { term?: string, page?: string, friend?: string };
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
        if (!!parsed.friend) actualFilter = {
            ...actualFilter,
            friend: parsed.friend === "null" ? null : (parsed.friend == 'true')
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        if (pageNumber === currentPage) return
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followUsersCb = (userId: number) => {
        dispatch(followUsers(userId))
    }

    const unfollowUsersCb = (userId: number) => {
        dispatch(unfollowUsers(userId))
    }

    const onShowSizeChange = (currentPage: number, pageSize: number) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const Paginator: FC<React.StyleHTMLAttributes<CSSProperties>> = (props) => (
        <Pagination
            style={props.style}
            current={currentPage}
            onShowSizeChange={onShowSizeChange}
            total={totalUsersCount}
            size={'small'}
            pageSize={pageSize} onChange={onPageChanged}
        />
    )

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            {users.length ?
                <>
                    <Paginator style={{marginBottom: 40, marginTop: 20}}/>
                    {users.map((user: UserType) => (
                        <User
                            user={user} key={user.id}
                            followUsers={followUsersCb}
                            unfollowUsers={unfollowUsersCb}
                            followingInProgress={followingInProgress}
                        />
                    ))}
                    <Paginator style={{marginBottom: 40}}/>
                </> :
                <span>User undefined</span>
            }
        </div>
    )
}


export default Users;