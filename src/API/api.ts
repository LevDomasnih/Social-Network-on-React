import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "90e619dd-9c4c-4644-96ed-82ca9fccd865",
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export type GetItemType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: ResultCodesEnum
}