import React from 'react';
// import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {currentElem} from "../../redux/state";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.profilePage.posts} addPost={props.addPost} updateNewPostText={props.updateNewPostText} />
        </div>
    )
};

export default Profile;