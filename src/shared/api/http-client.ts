/**
 * Минимальная обёртка над fetch.
 * Ничего не знает о конкретном API: только базовый URL, query-параметры и ошибки.
 */

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError

type QueryParams = Record<string, string | number | boolean | undefined>

type RequestOptions = {
  params?: QueryParams
  signal?: AbortSignal
}

export const createHttpClient = (baseUrl: string) => {
  const buildUrl = (path: string, params?: QueryParams) => {
    const url = new URL(path, baseUrl)
    for (const [key, value] of Object.entries(params ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
    return url
  }

  const get = async <T>(path: string, { params, signal }: RequestOptions = {}): Promise<T> => {
    const response = await fetch(buildUrl(path, params), { signal })

    if (!response.ok) {
      throw new ApiError(response.status, `GET ${path} failed with status ${response.status}`)
    }

    return (await response.json()) as T
  }

  return { get }
}

export type HttpClient = ReturnType<typeof createHttpClient>
