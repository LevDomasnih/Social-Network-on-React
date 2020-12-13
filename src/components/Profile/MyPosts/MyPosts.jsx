import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

    const postsElements = props.posts.map( (p) => <Post message={p.message} likesCount={p.likesCount}/>)

    let newPostElements = React.createRef();

    const addPost = () => {
        props.addPost();
        newPostElements.current.value = '';
    }

    const onPostChange = () => {
        let text = newPostElements.current.value;
        props.updateNewPostText(text);
    };

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={ onPostChange } value={props.newPostText} ref={newPostElements}/>
                </div>
                <div>
                    <button onClick={ addPost }>Add button</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;