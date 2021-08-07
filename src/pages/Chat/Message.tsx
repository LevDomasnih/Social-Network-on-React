import React, {FC} from "react";
import {ChatMessageAPIType} from "../../API/chatAPI";
import {Avatar, Comment} from "antd";
import {NavLink} from "react-router-dom";

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => (
    <Comment
        avatar={
            <NavLink to={`/profile/${message.userId}`}>
                <Avatar src={message.photo}/>
            </NavLink>
        }
        author={
            <NavLink to={`/profile/${message.userId}`}>
                {message.userName}
            </NavLink>
        }
        content={message.message}
    />
))