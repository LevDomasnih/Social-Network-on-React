import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chatReducer"
import { AppStateType } from "../../redux/reduxStore"
import { ChatMessageAPIType } from "../../API/chatAPI"


const ChatPage: FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <div>
            {status === "error" && <div>Error!!!</div>}
            <Messages/>
            <AddMessages/>
        </div>
    )
}

export default ChatPage

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] =  useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{ height: 400, overflowY: "auto" }} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo( ({ message }) => {
    return (
        <div>
            <img src={message.photo} style={{ width: 30 }}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
})

const AddMessages: FC = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const status = useSelector((state: AppStateType) => state.chat.status)

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
                <button disabled={status !== "ready"} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}