import React from 'react';
import MyPosts from "./MyPosts";
import {addPost} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {PostType} from "../../../types/types";

type MapStatePropsType = {
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    addPost,
})(MyPosts);

export default MyPostsContainer;