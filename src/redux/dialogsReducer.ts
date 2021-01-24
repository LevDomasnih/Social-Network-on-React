const SEND_MESSAGE = 'my-app/dialogsReducer/SEND-MESSAGE';

type DialogsType = {
    id: number
    name: string
    avatar: string
}

type MessagesType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: "I'm fine"},
    ] as Array<MessagesType>,
    dialogs: [
        {
            id: 1,
            name: "Andrey",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyddo-97z_upyrInLR38dIrT__x3Ov1lijg&usqp=CAU"
        },
        {
            id: 2,
            name: "Valera",
            avatar: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg"
        },
        {
            id: 3,
            name: "Svetha",
            avatar: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg"
        },
        {id: 4, name: "Leva", avatar: "https://f1.upet.com/A_r2u6uZhnxA_x.jpg"},
        {
            id: 5,
            name: "Kris",
            avatar: "https://avatars.mds.yandex.net/get-zen_doc/3420563/pub_5f0081e091f42b3b785b61a4_5f0082848694a157aa179dd0/scale_1200"
        },
        {
            id: 6,
            name: "Sasha",
            avatar: "https://static10.tgstat.ru/channels/_0/de/deeb9f0e7b43dc6d67f4628356c274d7.jpg"
        },
    ] as Array<DialogsType>,
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: action.newMessageBody}],
            };
        default:
            return state;
    }
}

export default dialogsReducer;

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessage = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});
