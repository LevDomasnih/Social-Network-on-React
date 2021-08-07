import {FC} from 'react';
import {Avatar, Comment} from "antd";
import {DialogsType, MessagesType} from "../../../redux/dialogsReducer";

type PropsType = {
    dialog: DialogsType
    message: MessagesType
}

const MessageItem: FC<PropsType> = ({dialog: {avatar, name, id}, message}) => {
        if (id === 13484) {
            return <Comment
                author={name}
                avatar={
                    <Avatar
                        src={avatar}
                    />
                }
                content={
                    <p>
                        {message.message}
                    </p>
                }
            />
        }
        return <Comment
            content={
                <p>
                    {message.message}
                </p>
            }
        />

}

export default MessageItem;