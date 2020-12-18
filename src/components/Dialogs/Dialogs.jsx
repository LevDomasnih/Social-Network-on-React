import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";

const Dialogs = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name}
                                                                             id={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map((m) => <MessageItem message={m.message}/>);
    let newMessageText = props.dialogsPage.newMessageText;

    const onSendMessage = (e) => {
        props.sendMessage();
        e.target.value = '';
    }

    const onMessageChange = (e) => {
        let newMessage = e.target.value;
        props.messageChange(newMessage);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange} value={newMessageText}/>
                </div>
                <div>
                    <button onClick={onSendMessage}>Add button</button>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;