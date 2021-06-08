import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {chatAPI, chatMessageType} from "../API/chatAPI";
import {FormAction, stopSubmit} from "redux-form";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as Array<chatMessageType>
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

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}
