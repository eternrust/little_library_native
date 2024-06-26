/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

export const deleteUser = async (accessToken: string) => {
    return await instance({
        method: 'DELETE',
        url: `user/quit`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}
