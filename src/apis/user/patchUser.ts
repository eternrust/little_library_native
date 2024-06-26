/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

interface PatchUserRequest {
    name: string
}


export const patchUser = async (accessToken: string, data: PatchUserRequest) => {
    return await instance({
        method: 'PATCH',
        url: 'user/profile',
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}
