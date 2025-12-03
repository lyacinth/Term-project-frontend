import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/characters',
})

export const getCharacterList = async () => {
  const res = await api.get(``)
  return res.data
}

export const getCharacterDetail = async (id) => {
  const res = await api.get(`/${id}`)
  return res.data
}