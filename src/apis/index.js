import axios from 'axios'
import { toast } from 'react-toastify'
import { APIROOT } from '~/utils/contans'
// axios instance for making requests
const axiosInstance = axios.create({
  baseURL: APIROOT
})
export const fetchBoardDetailAPI = async (boardId) => {
  const request = await axiosInstance.get(`/v1/boards/${boardId}`)
  return request.data
}

const errorHandler = (error) => {
  if (error.response?.status >= 300) {
    toast.error(`${error.response.statusText}`, {
      position: 'top-center',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0
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
