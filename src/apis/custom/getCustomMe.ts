/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'
import { CustomType } from './postCreateCustomPage'

export const getCustomMe = async (accessToken: string) => {
	return await instance<CustomType[]>({
		method: 'GET',
		url: 'custom/user/me',
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
