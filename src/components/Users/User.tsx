import React from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import {Avatar, Button, Col, Divider, Image, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

export type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollowUsers: (userId: number) => void
    followUsers: (userId: number) => void
}

const User: React.FC<UserPropsType> = ({followUsers, followingInProgress, unfollowUsers, user}) => (
    <Row key={user.id}>
        <Col span={3}>
            <NavLink to={'/profile' + `/${user.id}`}>
                {user.photos.small == null ?
                    <Avatar size={80} icon={<UserOutlined/>}/> :
                    <Avatar size={80} src={<Image src={user.photos.small}/>}/>
                }
            </NavLink>
        </Col>
        <Col span={17}>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>Country, City</div>
        </Col>
        <Col span={2} offset={2}>
            {user.followed
                ? <Button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => unfollowUsers(user.id)}>Unfollow</Button>

                : <Button disabled={followingInProgress.some(id => id === user.id)}
                          onClick={() => followUsers(user.id)}>Follow</Button>
            }
        </Col>
        <Divider/>
    </Row>
)

export default User