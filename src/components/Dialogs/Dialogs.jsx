import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/state";


const Dialogs = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name}
                                                                             id={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map((m) => <MessageItem message={m.message}/>);

    let newMessageElements = React.createRef();

    const sendMessage = () => {
        props.dispatch(addMessageActionCreator())
        newMessageElements.current.value = '';
    }

    const onMessageChange = () => {
        let text = newMessageElements.current.value;
        props.dispatch(onMessageChangeActionCreator(text));
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange} value={props.newMessageText} ref={newMessageElements}/>
                </div>
                <div>
                    <button onClick={sendMessage}>Add button</button>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;