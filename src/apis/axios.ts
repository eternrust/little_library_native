import axios, { AxiosError } from 'axios'

// 만약 통신이 안된다면 아래처럼 해보세요
// adb devices
// adb -s <device_name> reverse tcp:backend_port tcp:backend_port

export const instance = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 30000
})

instance.interceptors.request.use(
	async config => {
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(undefined, error => {
	throw error
})
