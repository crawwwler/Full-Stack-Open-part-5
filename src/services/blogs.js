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
    const response = await axios.put(`${baseUrl}/${id}`, objtp)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, update, remove }