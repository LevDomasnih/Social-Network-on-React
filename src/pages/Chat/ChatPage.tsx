import React, {FC, useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer"
import {AppStateType} from "../../redux/reduxStore"
import {ChatMessageAPIType} from "../../API/chatAPI"
import {Avatar, Comment, Spin} from "antd";
import {Editor} from "../../components/Profile/MyPosts/MyPosts";
import {NavLink} from "react-router-dom"
import {UserOutlined} from "@ant-design/icons";


const ChatPage: FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])


    return (
        <Spin style={{position: "fixed", maxHeight: "none"}} spinning={status !== "ready"}>
            <div>
                {status === "error" && <div>Error!!!</div>}
                <Messages/>
                <AddMessages/>
            </div>
        </Spin>
    )
}

export default ChatPage

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

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
        <div style={{height: 500, overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => (
    <Comment
        avatar={
            <NavLink to={'/profile' + `/${message.userId}`}>
                <Avatar src={message.photo}/>
            </NavLink>
        }
        author={
            <NavLink to={'/profile' + `/${message.userId}`}>
                {message.userName}
            </NavLink>
        }
        content={message.message}
    />
))

const AddMessages: FC = () => {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const status = useSelector((state: AppStateType) => state.chat.status)
    const photo = useSelector((state: AppStateType) => state.profilePage.ownProfile?.photos.small)

    const sendMessageHandler = () => {
        if (!message) return
        setSubmitting(true)
        dispatch(sendMessage(message))
        setSubmitting(false)
        setMessage("")
    }

    const handleChange = (e: { target: HTMLTextAreaElement }) => {
        setMessage(e.target.value)
    };

    return (
        <Comment
            avatar={
                <Avatar
                    src={photo || ''}
                    icon={<UserOutlined/>}
                />
            }
            content={
                <Editor
                    onChange={handleChange}
                    onSubmit={sendMessageHandler}
                    submitting={submitting}
                    value={message}
                    isDisabled={status !== "ready"}
                    text={"Add message"}
                />
            }
        />
    )
}