/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'
import { CustomType } from './postCreateCustomPage'

export const getCustomUser = async (accessToken: string, id: number) => {
	return await instance<CustomType[]>({
		method: 'GET',
		url: `custom/user/${id}`,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
