import {getAuthUserData} from "./authReducer";
import {InferActionTypes} from "./reduxStore";

let initialState = {
    initialized: false,
}

type appReducerType = typeof initialState

type ActionsTypes = ActionTypes

const appReducer = (state = initialState, action: ActionsTypes): appReducerType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
}

export default appReducer;

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({type: "INITIALIZED_SUCCESS"} as const)
}


export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}