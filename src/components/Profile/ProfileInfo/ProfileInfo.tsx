import React from 'react';
import style from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/userPhoto.jpg'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {savePhoto, updateStatus} from "../../../redux/profileReducer";
import {Button, Col, Descriptions, Row, Skeleton, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons';

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
        return (
            <Row>
                <Col span={8}>
                    <Skeleton.Image style={{ width: 200, height: 200}} />
                </Col>
                <Col span={16}>
                    <Descriptions title="User Info">
                        <Descriptions.Item label="Name"><Skeleton.Input style={{ width: 50 }} size='small' active/></Descriptions.Item>
                        <Descriptions.Item label="Status"><Skeleton.Input style={{ width: 50 }} size='small' active/></Descriptions.Item>
                        <Descriptions.Item label="About me"><Skeleton.Input style={{ width: 50 }} size='small' active/></Descriptions.Item>
                        <Descriptions.Item
                            label="Looking for a job"><Skeleton.Input style={{ width: 50 }} size='small' active/></Descriptions.Item>
                        <Descriptions.Item label="Looking for a job description">
                            <Skeleton.Input style={{ width: 50 }} size='small' active/>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        )
    }

    const contacts = Object.entries(profile.contacts)
    let valuesOfObj = Object.values(profile.contacts)
    let isEveryNull = valuesOfObj.some(elem => elem != null)

    const onMainPhotoSelected = (e: any) => {
        dispatch(savePhoto(e.file.originFileObj))
    }
    //TODO update profile (edit profile)
    return (
        <Row>
            <Col span={8}>
                <img src={profile.photos.large || userPhoto} className={style.mainPhoto}/>
                {isOwner && <Upload onChange={onMainPhotoSelected}>
                    <Button icon={<UploadOutlined/>} style={{marginTop: 20}}>Click to Upload</Button>
                </Upload>}
            </Col>
            <Col span={16}>
                <Descriptions title="User Info">
                    <Descriptions.Item label="Name">{profile.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Status"><ProfileStatusWithHooks status={status} isOwner={isOwner}
                                                                              updateStatus={updateStatusCb}/></Descriptions.Item>
                    <Descriptions.Item label="About me">{profile.aboutMe || 'None'}</Descriptions.Item>
                    <Descriptions.Item
                        label="Looking for a job">{profile.lookingForAJob ? "YES" : "NO"}</Descriptions.Item>
                    <Descriptions.Item label="Looking for a job description">
                        {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "None"}
                    </Descriptions.Item>
                </Descriptions>
                {isEveryNull && (
                    <Descriptions title="Contacts" size='middle'>
                        {contacts.map(([key, value]) => {
                            return value != null ?
                                <Descriptions.Item label={key}>{value}</Descriptions.Item> : null;
                        })}
                    </Descriptions>
                )}
            </Col>
        </Row>

    )
}

export default ProfileInfo;