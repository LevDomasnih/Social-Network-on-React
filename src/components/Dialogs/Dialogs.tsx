import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {dialogsReducerType} from "../../redux/dialogsReducer";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

type NewMessageFormValuesType = {
    newMessageBody: string
}

type NewMessageFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>

type PropsType = {
    dialogsPage: dialogsReducerType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id}/>);
    const messagesElements = props.dialogsPage.messages.map((m) => <MessageItem message={m.message} key={m.id}/>);

    const addNewMessage = (values: {newMessageBody: string}) => {
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

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesTypeKeys>('Enter you message...', 'newMessageBody', [required], Textarea)}
                <Field component='textarea' name='newMessageBody' placeholder='Enter you message...'/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;