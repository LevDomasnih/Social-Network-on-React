import React from 'react';
import classes from './user.module.css';

const Users = (props) => {
    return (
        <div>
            {props.users.map((u) => (
                    <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={classes.userPhoto}/>
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={ () => { props.changeFollow(u.id) } }>Unfollow</button>
                                : <button onClick={ () => { props.changeFollow(u.id) } }>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.city}</div>
                            <div>{u.location.country}</div>
                        </span>
                    </span>
                    </div>
                )
            )}
        </div>
    );
}

export default Users;