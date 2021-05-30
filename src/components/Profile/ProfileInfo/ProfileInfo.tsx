import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/images/userPhoto.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {savePhoto, updateStatus} from "../../../redux/profileReducer";

type PropsType = {
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({isOwner}) => {

    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)

    const dispatch = useDispatch()

    const updateStatusCb = (status: string) => {
        dispatch(updateStatus(status))
    }

    if (!profile) {
        return <Preloader/>
    }

    const contacts = Object.entries(profile.contacts)
    let valuesOfObj = Object.values(profile.contacts)
    let isEveryNull = valuesOfObj.some(elem => elem != null)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files && dispatch(savePhoto(e.target.files[0]))
    }
    //TODO update profile (edit profile)
    return (
        <div>
            <div>
                <img
                    src='https://strana.ua/img/article/2625/70_main.jpeg'/>
            </div>
            <div className={style.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={style.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatusCb}/>

                <div>
                    <b>Name: </b>{profile.fullName}
                </div>
                <hr/>
                <div>
                    <b>About me: </b>{profile.aboutMe}
                </div>
                <hr/>
                <div>
                    <b>Contacts: </b>
                    {isEveryNull && <ul>
                        {contacts.map(([key, value]) => {
                            return value != null ? <li>{key}: {value}</li> : null;
                        })}
                    </ul>}
                </div>
                <hr/>
                <div>
                    <br/><b>lookingForAJob: </b>{profile.lookingForAJob ? "YES" : "NO"}
                    <br/><b>lookingForAJobDescription: </b>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "NOPE"}
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo;