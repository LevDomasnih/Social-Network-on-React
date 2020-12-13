import React from 'react';
import classes from './Friends.module.css';

const Friends = (props) => {

    const friends = props.friends.map((e) => (
        <div className={classes.friendItem}>
            <img src={e.avatar} alt="" />
            <div>
                {e.name}
            </div>
        </div>));

    return (
        <div className={classes.friends}>
            <h3>Friends</h3>
            {friends}
        </div>
    )
};

export default Friends;