import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {chatAPI, chatMessageType, StatusType} from "../API/chatAPI";
import {FormAction, stopSubmit} from "redux-form";
import {Dispatch} from "redux";


let initialState = {
    messages: [] as Array<chatMessageType>,
    status: 'pending' as StatusType
}

type authReducerTypes = typeof initialState
type ActionsTypes = ActionTypes

const authReducer = (state = initialState, action: ActionsTypes): authReducerTypes => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [
                    ...state.messages,
                    ...action.payload.messages,
                ]
            };
        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}

export default authReducer;

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: chatMessageType[]) => ({
        type: "MESSAGES_RECEIVED",
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: "STATUS_CHANGED",
        payload: {status}
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

let _newMessageHandler: ((message: chatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (message) => {
            dispatch(actions.messagesReceived(message))
        };
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
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
