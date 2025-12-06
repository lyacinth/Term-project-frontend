import axios from 'axios'

const api = axios.create({
  baseURL: 'https://term-project-backend-496e.onrender.com/api/characters',
})

export const getCharacterList = async () => {
  const res = await api.get(``)
  return res.data
}

export const getCharacterDetail = async (id) => {
  const res = await api.get(`/${id}`)
  return res.data
}