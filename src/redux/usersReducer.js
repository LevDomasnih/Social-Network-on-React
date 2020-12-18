const SET_USERS = 'SET_USERS';
const CHANGE_FOLLOW = 'CHANGE_FOLLOW';

let initialState = {
    users: [
        {
            id: 1,
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyddo-97z_upyrInLR38dIrT__x3Ov1lijg&usqp=CAU",
            followed: false,
            fullName: 'Lev',
            status: 'Programmer =)))',
            location: {city: 'Prague', country: 'Czech'}
        },
        {
            id: 2,
            photoUrl: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg",
            followed: true,
            fullName: 'Kris',
            status: 'DESIGNER ',
            location: {city: 'Prague', country: 'Czech'}
        },
        {
            id: 3,
            photoUrl: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg",
            followed: true,
            fullName: 'Sasha',
            status: 'LOOOOOOOL',
            location: {city: 'Tver', country: 'Russia'}
        },
        {
            id: 4,
            photoUrl: "https://avatars.mds.yandex.net/get-zen_doc/3420563/pub_5f0081e091f42b3b785b61a4_5f0082848694a157aa179dd0/scale_1200",
            followed: false,
            fullName: 'Yaroslav',
            status: 'AUUUUFFF',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {
            id: 5,
            photoUrl: "https://static10.tgstat.ru/channels/_0/de/deeb9f0e7b43dc6d67f4628356c274d7.jpg",
            followed: true,
            fullName: 'Andrew',
            status: 'Hi everyone ',
            location: {city: 'Perm', country: 'Russia'}
        },
    ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userID) {
                        return {...u, followed: !u.followed};
                    }
                    return u;
                })
            };
        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export default usersReducer;
export const changeFollowAC = (userID) => ({type: CHANGE_FOLLOW, userID});
export const setUsersAC = (users) => ({type: SET_USERS, users});
