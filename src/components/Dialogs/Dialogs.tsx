import React from 'react';
import classes from './Dialogs.module.css'
import MessageItem from "./Message/MessageItem";
import {dialogsReducerType} from "../../redux/dialogsReducer";
import {Avatar, Menu} from "antd";
import {NavLink, useParams} from "react-router-dom";
import {FormTextarea} from "../common/FormTextarea/FormTextarea";


type PropsType = {
    dialogsPage: dialogsReducerType
    sendMessage: (messageText: string, dialogId: number) => void
}

const Dialogs: React.FC<PropsType> = (props) => {
    const {dialogId} = useParams<{ dialogId?: string }>();
    const dialog = props.dialogsPage.dialogs.filter(e => String(e.id) === dialogId)[0]

    const addNewMessage = (newMessageBody: string ) => {
        props.sendMessage(newMessageBody, Number(dialogId))
    };

    return (
        <div className={classes.dialogs}>
            <Menu
                style={{width: "100%"}}
                theme={'dark'}
                defaultSelectedKeys={[dialogId ?? '']}
            >
                {props.dialogsPage.dialogs.map((d) => (
                    <Menu.Item
                        style={{margin: "30px 15px"}} key={d.id}
                        icon={<Avatar src={d.avatar}/>}
                    >
                        <NavLink to={'/dialogs/' + d.id}>{d.name}</NavLink>
                    </Menu.Item>
                ))}
            </Menu>
            {dialogId && (
                <div className={classes.messages}>
                    {dialog.messages.map((message) => (
                        <MessageItem dialog={dialog} message={message} key={message.id}/>
                    ))}
                    <FormTextarea status={'ready'} sendMessage={addNewMessage}/>
                </div>
            )}
        </div>
    )
};


export default Dialogs;