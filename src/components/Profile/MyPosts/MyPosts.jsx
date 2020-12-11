import React from 'react';
import classes from './MyPosts.module.css';

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                New post
            </div>
            <div className={classes.item}>
                <div className={classes.item}>
                    post 1
                </div>
                <div className={classes.item}>
                    post 2
                </div>
            </div>
        </div>
    );
};

export default MyPosts;