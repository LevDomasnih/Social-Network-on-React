import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    profile: null | ProfileType
    status: string
    isOwner: boolean
}

const Profile: React.FC<PropsType> = ({isOwner, profile, status, savePhoto, updateStatus}) => {
    return (
        <div>
            <ProfileInfo profile={profile} savePhoto={savePhoto} isOwner={isOwner} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;