import axios from 'axios'
import { createBrowserHistory } from 'history'
import { toast } from 'react-toastify'
import { APIROOT } from '~/utils/constant'

const history = createBrowserHistory()

// axios instance for making requests
const axiosInstance = axios.create({
	baseURL: APIROOT
})
console.log('APIROOT = ', APIROOT)

export const fetchBoardsAPI = async () => {
	const request = await axiosInstance.get('/v1/boards')
	return request.data
}
export const fetchBoardDetailAPI = async (boardId) => {
	const request = await axiosInstance.get(`/v1/boards/${boardId}`)
	return request.data
}

export const updateBoardDetailAPI = async (boardId, updateData) => {
	const request = await axiosInstance.put(`/v1/boards/${boardId}`, updateData)
	return request.data
}

export const createBoardAPI = async (data) => {
	const request = await axiosInstance.post('/v1/boards', data)
	return request.data
}

export const createNewColumnAPI = async (newColumn) => {
	const request = await axiosInstance.post('/v1/columns', newColumn)
	return request.data
}
export const updateColumnDetailAPI = async (columndId, updateData) => {
	const request = await axiosInstance.put(`/v1/columns/${columndId}`, updateData)
	return request.data
}

export const deleteColumnAPI = async (columnId) => {
	const request = await axiosInstance.delete(`/v1/columns/${columnId}`)
	return request.data
}

export const creatNewCardAPI = async (newCard) => {
	const request = await axiosInstance.post('/v1/cards', newCard)
	return request.data
}

export const loginAPI = async (data) => {
	const request = await axiosInstance.post('/v1/auth/login', data, {
		skipInterceptor: true
	})
	return request.data
}

export const registerAPI = async (data) => {
	const request = await axiosInstance.post('/v1/auth/register', data, {
		skipInterceptor: true
	})
	return request.data
}

// Function to refresh token
const refreshToken = async () => {
	// Replace '/refresh-token' with your refresh token endpoint
	const response = await axiosInstance.post('/v1/auth/refresh-token', {
		refreshToken: localStorage.getItem('refreshToken')
	})
	return response.data.token
}

const errorHandler = async (error) => {
	toast.error(`${error.response.data.message || error.response.statusText}`, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true
	})


	return Promise.reject({ ...error })
}

axiosInstance.interceptors.request.use(async (config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

function handleDirectLogin() {
	localStorage.removeItem('token')
	localStorage.removeItem('refreshToken')
	history.push('/login')
}

axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const { response, config } = error
		const status = response?.status

		if (error.config && error.config.skipInterceptor === true) {
			return Promise.reject(error)
		}

		// Kiểm tra mã lỗi có phải là 401 hoặc 403 hay không
		if (status === 401 || status === 403) {
			// Chúng ta sẽ Thực hiện kịch bản refresh token tại đây

			const refreshTokenValue = localStorage.getItem('refreshToken')
			// console.log('refreshTokenValue = ', refreshTokenValue)
			if (refreshTokenValue) {
				try {
					const newToken = await refreshToken()
					localStorage.setItem('token', newToken)
					// console.log('newToken = ', newToken)
					return new Promise((resolve, reject) => {
						if (newToken) {
							resolve(axiosInstance(config))
						} else {
							reject({ ...error })
						}
					})
				} catch (errorTryRefreshToken) {
					// handle loi vao redux
					handleDirectLogin()
				}
			} else {
				handleDirectLogin()
			}
		}

		return errorHandler(error)
	}
)
