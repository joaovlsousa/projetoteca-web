import axios from 'axios'
import { Cookies } from 'react-cookie'
import { env } from '@/config/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

const cookies = new Cookies()

api.interceptors.request.use((config) => {
  const token: string | undefined = cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookies.remove('token')

      return Promise.resolve()
    }

    return Promise.reject(error)
  },
)
