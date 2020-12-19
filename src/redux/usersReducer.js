const SET_USERS = 'SET_USERS';
const CHANGE_FOLLOW = 'CHANGE_FOLLOW';

let initialState = {
    users: []
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
