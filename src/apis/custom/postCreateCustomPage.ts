/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

interface CustomRequest {
	type: 'page' | 'block' | 'date'
	style: string
	data: string
	parentId?: number
}

interface PostCreateCustomPageRequest {
	style: string
	data: string
	node: CustomRequest[]
}

export interface CustomType {
	id: number
	userId: number
	type: 'page' | 'block' | 'date'
	style: string
	data: string
	createdAt: string
	updatedAt: string
	deletedAt: string | null
	parentId: number | null
	node: CustomType[]
	isBookmark: boolean
	user: {
		name: string
	}
	isMe: boolean
}

export const postCreateCustomPage = async (accessToken: string, data: PostCreateCustomPageRequest) => {
	return await instance<CustomType>({
		method: 'POST',
		url: 'custom/create/page',
		data,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
