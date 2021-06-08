import { BaseThunkType, InferActionTypes } from "./reduxStore"
import { chatAPI, ChatMessageAPIType, StatusType } from "../API/chatAPI"
import { FormAction } from "redux-form"
import { Dispatch } from "redux"
import { v1 } from "uuid"

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
}

type chatReducerTypes = typeof initialState
type ActionsTypes = ActionTypes

const chatReducer = (state = initialState, action: ActionsTypes): chatReducerTypes => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages.map(m => ({ ...m, id: v1() })),
                ].filter((m, index, array) => index >= array.length - 100),
            }
        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state
    }
}

export default chatReducer

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: "MESSAGES_RECEIVED",
        payload: { messages },
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "STATUS_CHANGED",
        payload: { status },
    } as const),
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

let _newMessageHandler: ((message: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (message) => {
            dispatch(actions.messagesReceived(message))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
