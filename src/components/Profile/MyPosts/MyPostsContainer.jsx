import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = (props) => {


    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();

                const addPost = () => {
                    store.dispatch(addPostActionCreator());
                };
                const onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text);
                    store.dispatch(action);
                };
                return (
                    <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                             posts={state.profilePage.posts}
                             newPostText={state.profilePage.newPostText}/>
                );
            }
            }
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;