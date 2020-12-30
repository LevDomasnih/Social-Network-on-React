import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const MyPosts = (props) => {

    const postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    const addNewPost = (values) => {
        props.addPost(values.newPost)
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostFormRedux onSubmit={addNewPost} />
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newPost' placeholder='Enter you post...' />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm({
    form: 'profileAddNewPostForm'
})(AddNewPostForm);

export default MyPosts;