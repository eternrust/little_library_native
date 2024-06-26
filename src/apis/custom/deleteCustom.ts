/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

export const deleteCustom = async (accessToken: string, id: number) => {
	return await instance({
		method: 'DELETE',
		url: `custom/${id}`,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	})
}
