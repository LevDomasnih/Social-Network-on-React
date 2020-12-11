import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img src='https://i.pinimg.com/originals/64/a8/8f/64a88f80d6b5a43b58d14c20c7ef4b89.jpg'/>
            { props.message }
            <div>
                <span>Like</span> { props.likesCount }
            </div>
        </div>
    );
};

export default Post;