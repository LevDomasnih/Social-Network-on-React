import React, {FC, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {Avatar, Comment} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Editor} from "../../Profile/MyPosts/MyPosts";

type PropsType = {
    sendMessage(message: string, dialogId?: number) : void
    status: string
}

export const FormTextarea: FC<PropsType> = ({sendMessage, status}) => {
    const [message, setMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const photo = useSelector((state: AppStateType) => state.profilePage.ownProfile?.photos.small)

    const sendMessageHandler = () => {
        if (!message) return
        setSubmitting(true)
        sendMessage(message)
        setSubmitting(false)
        setMessage("")
    }

    const handleChange = (e: { target: HTMLTextAreaElement }) => {
        setMessage(e.target.value)
    };

    return (
        <Comment
            avatar={
                <Avatar
                    src={photo || ''}
                    icon={<UserOutlined/>}
                />
            }
            content={
                <Editor
                    onChange={handleChange}
                    onSubmit={sendMessageHandler}
                    submitting={submitting}
                    value={message}
                    isDisabled={status !== "ready"}
                    text={"Add message"}
                />
            }
        />
    )
}