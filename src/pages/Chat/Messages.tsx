import React, {FC, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {Message} from "./Message";

export const Messages: FC = () => {
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
    }, [messages, isAutoScroll])

    return (
        <div style={{height: 500, overflowY: "auto"}} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef} />
        </div>
    )
}