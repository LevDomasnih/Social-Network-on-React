import React from "react";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.jpg";
import classes from "./user.module.css";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollowUsers: (userId: number) => void
    followUsers: (userId: number) => void
}

const User: React.FC<PropsType> = ({followUsers, followingInProgress, unfollowUsers, user}) => (
    <div key={user.id}>
            <span>
                <div>
                    <NavLink to={'/profile' + `/${user.id}`}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={classes.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollowUsers(user.id)
                                  }}>Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      followUsers(user.id)
                                  }}>Follow</button>
                    }
                </div>
            </span>
        <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.city"}</div>
                    <div>{"u.location.country"}</div>
                </span>
            </span>
    </div>
)

export default User