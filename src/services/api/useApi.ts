import { useCallback, useRef, useState } from 'react'
import axios, { type AxiosRequestConfig } from 'axios'
import { apiClient } from './axios.instance'
import type { ApiError, ApiStatus, HttpMethod } from './types'

type RequestOptions = Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      'Something went wrong'

    return {
      message,
      statusCode: error.response?.status ?? null,
      details: error.response?.data,
    }
  }

  if (error instanceof Error) {
    return { message: error.message, statusCode: null }
  }

  return { message: 'Unexpected error', statusCode: null }
}

/**
 * Generic API hook for GET | POST | PUT | PATCH | DELETE.
 * Tracks loading, status, statusCode, data, and error.
 *
 * @example
 * const { data, loading, status, error, get, post } = useApi<User[]>()
 * await get('/users')
 * await post('/users', { name: 'Ada' })
 */
export function useApi<TData = unknown>() {
  const [data, setData] = useState<TData | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [status, setStatus] = useState<ApiStatus>('idle')
  const [statusCode, setStatusCode] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setData(null)
    setError(null)
    setStatus('idle')
    setStatusCode(null)
    setLoading(false)
  }, [])

  const request = useCallback(
    async (
      method: HttpMethod,
      url: string,
      body?: unknown,
      options?: RequestOptions,
    ): Promise<TData | null> => {
      // Cancel any in-flight call from this hook instance
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setLoading(true)
      setStatus('loading')
      setError(null)

      try {
        const response = await apiClient.request<TData>({
          ...options,
          method,
          url,
          data: body,
          signal: controller.signal,
        })

        setData(response.data)
        setStatusCode(response.status)
        setStatus('success')
        return response.data
      } catch (err) {
        if (axios.isCancel(err)) {
          return null
        }

        const apiError = toApiError(err)
        setError(apiError)
        setStatusCode(apiError.statusCode)
        setStatus('error')
        setData(null)
        return null
      } finally {
        if (abortRef.current === controller) {
          setLoading(false)
          abortRef.current = null
        }
      }
    },
    [],
  )

  const get = useCallback(
    (url: string, options?: RequestOptions) =>
      request('GET', url, undefined, options),
    [request],
  )

  const post = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('POST', url, body, options),
    [request],
  )

  const put = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('PUT', url, body, options),
    [request],
  )

  const patch = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('PATCH', url, body, options),
    [request],
  )

  const del = useCallback(
    (url: string, options?: RequestOptions) =>
      request('DELETE', url, undefined, options),
    [request],
  )

  return {
    data,
    error,
    loading,
    status,
    statusCode,
    request,
    get,
    post,
    put,
    patch,
    del,
    reset,
  }
}
