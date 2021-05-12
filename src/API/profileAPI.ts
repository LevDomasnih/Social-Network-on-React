import {instance, ResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type profilePhotosType = {
    photos: PhotosType
}

export const ProfileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status})
            .then(response => response.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put<ResponseType<profilePhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    }
}