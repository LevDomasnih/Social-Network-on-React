type SubscribersType = (messages: chatMessageType[]) => void;

let subscribers = [] as Array<SubscribersType>

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    ws?.removeEventListener("close", closeHandler)
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
        subscribers = []
        ws?.close()
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", onMessageHandler)
    },
    subscribe(callback: SubscribersType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribersType) {
        subscribers = subscribers.filter(s => s !== callback)
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