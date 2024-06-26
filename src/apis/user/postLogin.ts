/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { instance } from '..'

interface PostLoginRequest {
	email: string
	password: string
}

interface PostLoginResponse {
	accessToken: string
	refreshToken: string
}

export const postLogin = async (data: PostLoginRequest) => {
	return await instance<PostLoginResponse>({
		method: 'POST',
		url: 'user/login',
		data
	})
}
