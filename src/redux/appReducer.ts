import {getAuthUserData} from "./authReducer";

const INITIALIZED_SUCCESS = 'my-app/appReducer/INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean,
}

let initialState: InitialStateType = {
    initialized: false,
}

type ActionsTypes = (
    InitialStateSuccessActionType
)

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

export default appReducer;

type InitialStateSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitialStateSuccessActionType => ({ type: INITIALIZED_SUCCESS });



export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}