import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "90e619dd-9c4c-4644-96ed-82ca9fccd865",
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    followUsers(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollowUsers(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    }
};

export const ProfileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
            .then(response => response.data);
    },
};

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    },
};