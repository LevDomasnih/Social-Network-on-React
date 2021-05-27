import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import {AddNewPostFormRedux, PostFormValuesType} from "./AddNewPostForm";

type PropsType = {
    addPost: (values: string) => void
    posts: Array<PostType>
}

const MyPosts: React.FC<PropsType> = React.memo(({addPost, posts}) => {

    const postsElements = posts.map((p) => <Post message={p.message} likesCount={p.likesCount}
                                                       key={p.id}/>);
    const addNewPost = (values: PostFormValuesType) => {
        addPost(values.newPost)
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostFormRedux onSubmit={addNewPost}/>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
});

export default MyPosts;