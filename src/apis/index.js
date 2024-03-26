import axios from 'axios'
import { toast } from 'react-toastify'
import { APIROOT } from '~/utils/constant'
// axios instance for making requests
const axiosInstance = axios.create({
  baseURL: APIROOT
})
export const fetchBoardDetailAPI = async (boardId) => {
  const request = await axiosInstance.get(`/v1/boards/${boardId}`)
  return request.data
}

export const updateBoardDetailAPI = async (boardId, updateData) => {
  const request = await axiosInstance.put(`/v1/boards/${boardId}`, updateData)
  return request.data
}

export const createNewColumnAPI = async (newColumn) => {
  const request = await axiosInstance.post('/v1/columns', newColumn)
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

const errorHandler = (error) => {
  if (error.response?.status >= 300) {
	  toast.error(`${error.response.data.message || error.response.statusText}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true

    })
  }

  return Promise.reject({ ...error })
}


// response interceptor for handling common errors (e.g. HTTP 500)
axiosInstance.interceptors.response.use(
  (response) => {
	  return response
  },
  (error) => errorHandler(error)
)
