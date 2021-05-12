import {GetItemType, instance, ResponseType} from "./api";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    followUsers(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollowUsers(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then(response => response.data);
    }
};