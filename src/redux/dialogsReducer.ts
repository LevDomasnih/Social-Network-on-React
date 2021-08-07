import {InferActionTypes} from "./reduxStore";

export type DialogsType = {
    id: number
    name: string
    avatar: string
    messages: MessagesType[]
}

export type MessagesType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: "I'm fine"},
    ] as MessagesType[],
    dialogs: [
        {
            id: 1,
            name: "Andrey",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyddo-97z_upyrInLR38dIrT__x3Ov1lijg&usqp=CAU",
            messages: [
                {id: 13484, message: 'hello1'}, // TODO добавить userId
                {id: 12341, message: 'hi1'},
                {id: 12345, message: 'Fine1'},
                {id: 31245, message: 'I am1'},
            ]
        },
        {
            id: 2,
            name: "Valera",
            avatar: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg",
            messages: [
                {id: 13484, message: 'hello2'}, 
                {id: 12341, message: 'hi2'},
                {id: 12345, message: 'Fine2'},
                {id: 31245, message: 'I am2'},
            ]
        },
        {
            id: 3,
            name: "Svetha",
            avatar: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg",
            messages: [
                 {id: 13484, message: 'hello3'}, 
                {id: 12341, message: 'hi3'},
                {id: 12345, message: 'Fine3'},
                {id: 31245, message: 'I am3'},
            ]
        },
        {id: 4, name: "Leva", avatar: "https://f1.upet.com/A_r2u6uZhnxA_x.jpg",
            messages: [
                 {id: 13484, message: 'hello4'}, 
                {id: 12341, message: 'hi4'},
                {id: 12345, message: 'Fine4'},
                {id: 31245, message: 'I am4'},
            ]
        },
        {
            id: 5,
            name: "Kris",
            avatar: "https://avatars.mds.yandex.net/get-zen_doc/3420563/pub_5f0081e091f42b3b785b61a4_5f0082848694a157aa179dd0/scale_1200",
            messages: [
                 {id: 13484, message: 'hello5'}, 
                {id: 12341, message: 'hi5'},
                {id: 12345, message: 'Fine5'},
                {id: 31245, message: 'I am5'},
            ]
        },
        {
            id: 6,
            name: "Sasha",
            avatar: "https://static10.tgstat.ru/channels/_0/de/deeb9f0e7b43dc6d67f4628356c274d7.jpg",
            messages: [
                 {id: 13484, message: 'hello6'}, 
                {id: 12341, message: 'hi6'},
                {id: 12345, message: 'Fine6'},
                {id: 31245, message: 'I am6'},
            ]
        },
    ] as Array<DialogsType>,
}

export type dialogsReducerType = typeof initialState
type ActionsType = ActionType

const dialogsReducer = (state = initialState, action: ActionsType): dialogsReducerType => {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: action.newMessageBody}],
                dialogs: state.dialogs.map(e => {
                    if (e.id === action.dialogId) {
                        e.messages.push({
                            id: e.messages[e.messages.length - 1].id + 1,
                            message: action.newMessageBody
                        })
                    }
                    return e
                })
            };
        default:
            return state;
    }
}

export default dialogsReducer;

type ActionType = InferActionTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string, dialogId: number) => ({type: "SEND_MESSAGE", dialogId, newMessageBody} as const)
}