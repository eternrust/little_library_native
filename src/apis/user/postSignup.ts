/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

interface PostSignupRequest {
	name: string
	email: string
	password: string
}

export const postSignup = async (data: PostSignupRequest) => {
	return await instance({
		method: 'POST',
		url: 'user/signup',
		data
	})
}
