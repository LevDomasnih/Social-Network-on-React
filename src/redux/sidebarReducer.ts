
let initialState = {
    friends: [
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
    ]
}

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: {}): InitialStateType => {
    //      In progress
    return state;
}

export default sidebarReducer;