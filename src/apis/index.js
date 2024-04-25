import axios from 'axios'
import { toast } from 'react-toastify'
import { logout } from '~/redux/authSlice'
import store from '~/redux/store' // replace with the actual path
import { APIROOT } from '~/utils/constant'

// axios instance for making requests
const axiosInstance = axios.create({
	baseURL: APIROOT
})
// console.log('APIROOT = ', APIROOT)

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

export const getCurrentUserAPI = async () => {
	const request = await axiosInstance.get('/v1/auth/me') // replace with your actual endpoint
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
		skipInterceptor: true,
		refreshToken: localStorage.getItem('refreshToken')
	})
	return response.data.token
}

const errorHandler = async (error) => {
	// console.log('error.response = ', error.response)

	let content = error?.response?.data?.message || error?.response?.statusText

	// optimize content of error message for toast
	toast.error(content, {
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

axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		const { response, config } = error
		const status = response?.status

		// Kiểm tra mã lỗi có phải là 401 hoặc 403 hay không, vao case het han token hoac token khong hop le
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
					// console.log('errorTryRefreshToken = ', errorTryRefreshToken)
					// handle loi vao redux
					store.dispatch(logout()) // Dispatch the logout action

				}
			} else {
				store.dispatch(logout()) // Dispatch the logout action

			}
		}

		if (error.config && error.config.skipInterceptor === true) {
			return Promise.reject(error)
		}

		return errorHandler(error)
	}
)
