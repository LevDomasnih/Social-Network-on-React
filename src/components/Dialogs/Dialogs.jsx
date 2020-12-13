import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/MessageItem";


const Dialogs = (props) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem avatar={d.avatar} name={d.name} id={d.id} />);
    const messagesElements = props.dialogsPage.messages.map((m) => <MessageItem message={m.message} />);

    let newMessageElements = React.createRef();

    let addMessage = () => {
        let text = newMessageElements.current.value;
        alert(text)
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea ref={newMessageElements}/>
                </div>
                <div>
                    <button onClick={ addMessage }>Add button</button>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;