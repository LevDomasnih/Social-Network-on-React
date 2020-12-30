import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map((m) => <MessageItem message={m.message} key={m.id}/>);

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    };

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='Enter you message...'/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;