import React, { FC, useEffect, useState } from "react"
import {chatMessageType} from "../../API/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";
import {AppStateType} from "../../redux/reduxStore";




const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            <Messages/>
            <AddMessages/>
        </div>
    )
}

export default ChatPage

const Messages: FC = () => {

    const messages = useSelector((state: AppStateType)=> state.chat.messages)

    return (
        <div style={{ height: 400, overflowY: "auto" }}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: FC<{ message: chatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} style={{ width: 30 }}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
}

const AddMessages: FC = () => {

    const [message, setMessage] = useState("")
    const [readyStatus, setReadyStatus] = useState<"ready" | "pending">("pending")

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage("")
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}