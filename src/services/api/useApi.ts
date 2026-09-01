import { useCallback, useRef, useState } from 'react'
import axios, { type AxiosRequestConfig } from 'axios'
import { api } from './axios.instance'
import type { ApiError, ApiStatus, HttpMethod } from './types'

type RequestOptions = Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>

function toApiError(error: unknown): ApiError {
  console.log(error , "error")
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.statusMessage ?? 'Something went wrong'

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
        const response = await api.request<TData>({
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

  const GET = useCallback(
    (url: string, options?: RequestOptions) =>
      request('GET', url, undefined, options),
    [request],
  )

  const POST = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('POST', url, body, options),
    [request],
  )

  const PUT = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('PUT', url, body, options),
    [request],
  )

  const PATCH = useCallback(
    (url: string, body?: unknown, options?: RequestOptions) =>
      request('PATCH', url, body, options),
    [request],
  )

  const DELETE = useCallback(
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
    reset,
    GET, PATCH, PUT, DELETE, POST,
  }
}
