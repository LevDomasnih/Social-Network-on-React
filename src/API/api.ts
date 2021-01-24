import axios from "axios";

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

    followUsers(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollowUsers(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    }
};

export const ProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
            .then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    getAuthUserData() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe })
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data);
    },
};