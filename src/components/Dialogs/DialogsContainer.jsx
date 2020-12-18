import React from 'react';
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState();

    const sendMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    const messageChange = (newMessage) => {
        props.store.dispatch(onMessageChangeActionCreator(newMessage));
    }

    return <Dialogs sendMessage={sendMessage} messageChange={messageChange}
                    dialogsPage={state.dialogsPage}/>
};

export default DialogsContainer;