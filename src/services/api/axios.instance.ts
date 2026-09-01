import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { emitLogout } from './authToken'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? ''

export const apiClient = axios.create({
  baseURL,
  timeout: 30_000,
  // Required for cross-origin cookie auth (FE :4001 → API :4002)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Alias used by useApi / older imports
export const api = apiClient

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Cookie is sent automatically via withCredentials — no Bearer header needed
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const url = error.config?.url ?? ''
    const isAuthBootstrap =
      url.includes('/auth/me') ||
      url.includes('/auth/login') ||
      url.includes('/auth/register')

    // Don't force-logout on expected unauthenticated bootstrap/login failures
    if (error.response?.status === 401 && !isAuthBootstrap) {
      emitLogout()
    }

    return Promise.reject(error)
  },
)
