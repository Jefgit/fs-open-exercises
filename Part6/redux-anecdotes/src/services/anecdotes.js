import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then((res) => res.data)
}

export default { getAll, createNew, vote }
