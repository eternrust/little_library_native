/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

export const postBookmarkCheck = async (accessToken: string, id: number) => {
	return await instance({
		method: 'POST',
		url: `custom/bookmark/${id}`,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
