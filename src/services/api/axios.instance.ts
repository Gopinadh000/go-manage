import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { emitLogout, getAuthToken } from './authToken'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Before every request → attach saved token if present
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// If backend says unauthorized → clear token + notify AuthContext
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      emitLogout()
    }

    return Promise.reject(error)
  },
)
