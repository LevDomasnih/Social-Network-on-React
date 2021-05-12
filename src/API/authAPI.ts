import {instance, ResponseType} from "./api";

export type MeResponseType = {
    id: number
    email: string
    login: string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {
    getAuthUserData() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<ResponseType<LoginResponseType>>(`auth/login`, {email, password, rememberMe})
            .then(response => response.data);
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => response.data);
    },
};