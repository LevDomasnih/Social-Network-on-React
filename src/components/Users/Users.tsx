import React from 'react';
import classes from './user.module.css';
import userPhoto from '../../assets/images/userPhoto.jpg';
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";

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

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,
                                        ...props}) => {
    return (
        <div>
            <div>
                <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                           pageSize={pageSize} onPageChanged={onPageChanged}/>
            </div>
            {users.map((u: any) => (
                    <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile' + `/${u.id}`}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={classes.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => { props.unfollowUsers(u.id) }}>Unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => { props.followUsers(u.id) }}>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                    </span>
                    </div>
                )
            )}
        </div>
    );
}

export default Users;