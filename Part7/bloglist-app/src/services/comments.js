import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)

  return request.then((response) => response.data)
}

const addComment = async (content, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, content)
  return response.data
}

export default { getAll, addComment }
