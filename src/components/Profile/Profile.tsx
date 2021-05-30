import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type PropsType = {
    isOwner: boolean
}

const Profile: React.FC<PropsType> = ({isOwner}) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} />
            <MyPostsContainer />
        </div>
    )
};

export default Profile;