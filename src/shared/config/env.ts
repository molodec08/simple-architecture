/**
 * Конфигурация окружения.
 * Все обращения к import.meta.env собраны здесь, чтобы остальной код
 * не зависел от Vite напрямую.
 */
export const env = {
  tvmazeApiUrl: import.meta.env.VITE_TVMAZE_API_URL ?? 'https://api.tvmaze.com',
  isDev: import.meta.env.DEV,
} as const
