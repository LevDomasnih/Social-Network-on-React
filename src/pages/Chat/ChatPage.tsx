import React, {FC, useEffect, useState} from "react";


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

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            if (ws !== null) {
                ws.removeEventListener('close', closeHandler)
            }
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessages wsChannel={wsChannel} />
        </div>
    )
}

export default ChatPage

const Messages: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<chatMessageType[]>([])

    useEffect(() => {
        wsChannel?.addEventListener('message', (e) => {
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

const AddMessages: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'ready' | "pending">('pending')

    useEffect(() => {
        wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready')
        })
    }, [])

    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}