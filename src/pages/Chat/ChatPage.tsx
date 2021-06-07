import React, {FC, useEffect, useState} from "react";

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {
    return (
        <div>
            <Messages />
            <AddMessages />
        </div>
    )
}

export default ChatPage

const Messages: FC = () => {
    const [messages, setMessages] = useState<chatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prev) => [...prev, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: 400, overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    )
}

const Message: FC<{message: chatMessageType}> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{width: 30}} />  <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

const AddMessages: FC = () => {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) return
        ws.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}