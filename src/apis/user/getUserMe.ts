/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'
import { UserType } from './getUser'

export const getUserMe = async (accessToken: string) => {
    return await instance<UserType>({
        method: 'GET',
        url: 'user/profile/me',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}
