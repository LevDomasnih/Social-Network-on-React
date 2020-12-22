import React from 'react';
import classes from './user.module.css';
import userPhoto from '../../assets/images/userPhoto.jpg';
import cn from 'classnames';
import {NavLink} from "react-router-dom";
import * as axios from "axios";

const Users = (props) => {

    const changeCountPagesOnPage = (currentPage, totalUsersCount, pageSize) => {
        let pagesCount = Math.ceil(totalUsersCount / pageSize);
        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let left = currentPage - 1;
        let right = currentPage + 1;
        let center = currentPage;

        if (center === 1) {
            return [center, right, pages[pages.length - 1]];
        } else if (center === pages[pages.length - 1]) {
            return [pages[0], left, center]
        } else {
            return [pages[0], left, center, right, pages[pages.length - 1]];
        }
    }
    const pages = changeCountPagesOnPage(props.currentPage, props.totalUsersCount, props.pageSize)

    return (
        <div>
            <div>
                {
                    pages.map((p) => {
                        return <span onClick={() => {
                            props.onPageChanged(p)
                        }} className={cn(classes.pages, {[classes.selectedPage]: props.currentPage === p})}>{p}</span>
                    })
                }
            </div>
            {props.users.map((u) => (
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
                                ? <button onClick={() => {

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "90e619dd-9c4c-4644-96ed-82ca9fccd865",
                                        }})
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.unfollow(u.id)
                                            }
                                        });

                                }}>Unfollow</button>
                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "90e619dd-9c4c-4644-96ed-82ca9fccd865",
                                        }})
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
                                        })

                                }}>Follow</button>
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