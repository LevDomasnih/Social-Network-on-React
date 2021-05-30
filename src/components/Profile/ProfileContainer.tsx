import React, {useEffect} from 'react';
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import {getStatus, getUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";

type ParamsType = {
    userId: string
}

const ProfileContainer = () => {

    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)

    const dispatch = useDispatch()
    const history = useHistory()
    const newUserId = useParams<ParamsType>().userId || null

    useEffect(() => {
        refreshProfile()
    }, [newUserId])

    const refreshProfile = () => {
        let userId: number | null = Number(newUserId);
        if (!userId) {
            userId = authorizedUserId;
            if (!userId) {
                history.push("/login")
            }
        }

        if (!userId) {
            console.error("Id was a number")
        } else {
            dispatch(getUserProfile(userId))
            dispatch(getStatus(userId))
        }
    }

    return (
        <Profile
            isOwner={!newUserId}
        />
    )
}

export default ProfileContainer
