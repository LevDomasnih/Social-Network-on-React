import React, {FC, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatReducer"
import {AppStateType} from "../../redux/reduxStore"
import {Spin} from "antd";
import {FormTextarea} from "../../components/common/FormTextarea/FormTextarea";
import {Messages} from "./Messages";


const ChatPage: FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    const sendMessageChat = (message: string) => {
        dispatch(sendMessage(message))
    }

    return (
        <Spin style={{position: "fixed", maxHeight: "none"}} spinning={status !== "ready"}>
            <div>
                {status === "error" && <div>Error!!!</div>}
                <Messages/>
                <FormTextarea status={status} sendMessage={sendMessageChat}/>
            </div>
        </Spin>
    )
}

export default ChatPage

