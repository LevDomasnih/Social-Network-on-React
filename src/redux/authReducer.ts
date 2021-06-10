import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../API/authAPI";
import {ResultCodesEnum} from "../API/api";
import {BaseThunkType, InferActionTypes} from "./reduxStore";
import {getOwnProfile} from "./profileReducer";
import {actions as actionsProfile} from "./profileReducer";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
}

type authReducerTypes = typeof initialState
type ActionsTypes = ActionTypes

const authReducer = (state = initialState, action: ActionsTypes): authReducerTypes => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default authReducer;

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA",
        payload: {userId, email, login, isAuth}
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.getAuthUserData()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
        await dispatch(getOwnProfile(id))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData());
    } else {
        const message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit('login', {_error: message}));
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
        dispatch(actionsProfile.setOwnProfile(null))
    }
}
