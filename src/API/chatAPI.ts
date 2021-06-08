type MessagesReceivedSubscribersType = (messages: chatMessageType[]) => void;
type StatusChangedSubscribersType = (status: StatusType) => void;
export type StatusType = "ready" | "pending";

const subscribers = {
    'messages-received': [] as Array<MessagesReceivedSubscribersType>,
    'status-changed': [] as Array<StatusChangedSubscribersType>
}

let ws: WebSocket | null = null
type EventsNames = 'messages-received' | 'status-changed'

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", onMessageHandler)
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", onMessageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNames, callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subcribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNames, callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subcribers[eventName] = subcribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}