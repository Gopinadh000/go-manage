import type { AxiosRequestConfig } from 'axios'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** Request lifecycle for the hook UI state */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

export type ApiRequestConfig = Omit<AxiosRequestConfig, 'method' | 'url'> & {
  url: string
  method?: HttpMethod
}

export type ApiError = {
  message: string
  statusCode: number | null
  details?: unknown
}
