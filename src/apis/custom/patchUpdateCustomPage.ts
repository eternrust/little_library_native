/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

interface CustomRequest {
	id?: number,
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

export const patchUpdateCustomPage = async (accessToken: string, id: number, data: PostCreateCustomPageRequest) => {
	return await instance({
		method: 'PATCH',
		url: `custom/update/page/${id}`,
		data,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
