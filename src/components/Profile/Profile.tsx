import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

type PropsType = {
    isOwner: boolean
}

const Profile: React.FC<PropsType> = ({isOwner}) => {
    return (
        <div>
            <ProfileInfo isOwner={isOwner} />
            <MyPosts isOwner={isOwner} />
        </div>
    )
};

export default Profile;