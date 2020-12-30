import React from 'react';
import MyPosts from "./MyPosts";
import {addPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost,
})(MyPosts);

export default MyPostsContainer;