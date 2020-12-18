import React from 'react';
import {addMessageActionCreator, onMessageChangeActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";


const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                const sendMessage = () => {
                    store.dispatch(addMessageActionCreator())
                };
                const messageChange = (newMessage) => {
                    store.dispatch(onMessageChangeActionCreator(newMessage));
                };
                return (
                    <Dialogs sendMessage={sendMessage} messageChange={messageChange}
                             dialogsPage={store.getState().dialogsPage}/>
                );
            }
            }
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;