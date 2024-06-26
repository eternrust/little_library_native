/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

export interface UserType {
    id: number
    name: string
    email: string
    imageLink: string
    bookmark: BookmarkType[]
    isMe: boolean
}

export interface BookmarkType {
    id: number
    userId: number
    type: 'page' | 'block' | 'date'
    style: string
    data: string
    createdAt: string
    updatedAt: string
    parentId: number | null
    user_name: string
}

export const getUser = async (accessToken: string, id: number) => {
    return await instance<UserType>({
        method: 'GET',
        url: `user/profile/${id}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}
