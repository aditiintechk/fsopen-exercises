import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

export const getAll = () => {
	return axios.get(baseUrl)
}

export const create = (newData) => {
	return axios.post(baseUrl, newData)
}

export const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

export const update = (id, changedData) => {
	return axios.put(`${baseUrl}/${id}`, changedData)
}
