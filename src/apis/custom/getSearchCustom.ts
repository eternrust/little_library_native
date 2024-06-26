/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

export interface CustomPreviewType {
	user_name: string
	id: number
	style: string
	data: string
	createdAt: string
	updatedAt: string
	deletedAt: string | null
}

export const getSearchCustom = async (accessToken: string, word: string) => {
	return await instance<CustomPreviewType[]>({
		method: 'GET',
		url: 'custom/search',
		params: { word },
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
