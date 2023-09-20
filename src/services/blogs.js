import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (tk) => {
  token = `Bearer ${tk}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const create = async (objtp) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, objtp, config)
  return response.data
}


const update = async (objtp, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, objtp, config)
  return response.data
}

export default { getAll, create, setToken, update }