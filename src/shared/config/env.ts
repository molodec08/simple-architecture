/**
 * Конфигурация окружения.
 * Все обращения к import.meta.env собраны здесь, чтобы остальной код
 * не зависел от Vite напрямую.
 */
export const env = {
  /** Наш backend. В dev `/api` проксируется Vite на localhost:3000 */
  apiUrl: import.meta.env.VITE_API_URL ?? '/api',
  isDev: import.meta.env.DEV,
} as const
