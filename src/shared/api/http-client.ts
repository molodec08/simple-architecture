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

/** @param baseUrl — абсолютный (`https://…`) или относительный к сайту (`/api`) */
export const createHttpClient = (baseUrl: string) => {
  const buildUrl = (path: string, params?: QueryParams) => {
    const url = new URL(`${baseUrl.replace(/\/$/, '')}${path}`, window.location.origin)
    for (const [key, value] of Object.entries(params ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
    return url
  }

  const request = async <T>(method: string, path: string, { params, signal }: RequestOptions = {}): Promise<T> => {
    const response = await fetch(buildUrl(path, params), { method, signal })

    if (!response.ok) {
      throw new ApiError(response.status, `${method} ${path} failed with status ${response.status}`)
    }

    return (await response.json()) as T
  }

  return {
    get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
    post: <T>(path: string, options?: RequestOptions) => request<T>('POST', path, options),
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>
