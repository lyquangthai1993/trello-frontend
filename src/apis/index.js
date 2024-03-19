import axios from 'axios'
import { APIROOT } from '~/utils/contans'

export const fetchBoardDetailAPI = async (boardId) => {
  const request = await axios.get(`${APIROOT}/v1/boards/${boardId}`)
  return request.data
}
