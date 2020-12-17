import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/dialogsReducer";


const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    const dialogsElements = state.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map((m) => <MessageItem message={m.message}/>);
    let newMessageText = state.newMessageText;

    const sendMessage = (e) => {
        props.store.dispatch(addMessageActionCreator())
        e.target.value = '';
    }

    const onMessageChange = (e) => {
        let text = e.target.value;
        props.store.dispatch(onMessageChangeActionCreator(text));
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange} value={newMessageText} />
                </div>
                <div>
                    <button onClick={sendMessage}>Add button</button>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;