import React, {FC} from 'react';
import classes from './Post.module.css';
import {PostType} from "../../../../types/types";

type PropsType = {
    likesCount: PostType['likesCount']
    message: PostType['message']
}

const Post: FC<PropsType> = ({likesCount, message}) => {
    return (
        <div className={classes.item}>
            <img src='https://i.pinimg.com/originals/64/a8/8f/64a88f80d6b5a43b58d14c20c7ef4b89.jpg'/>
            { message }
            <div>
                <span>Like</span> { likesCount }
            </div>
        </div>
    );
};

export default Post;