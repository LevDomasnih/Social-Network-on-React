import {authAPI, ResultCodesEnum} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/authReducer/SET_USER_DATA'

export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

type ActionsTypes = (
    SetAuthUserDataActionType
    )

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.getAuthUserData()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
    return response
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        const message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}
