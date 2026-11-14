import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

/** Тот же ключ читает инлайн-скрипт в index.html, чтобы тема применилась до первого рендера. */
const STORAGE_KEY = 'theme'

const readTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage недоступен (приватный режим и т. п.) — берём системную тему
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

let currentTheme = readTheme()
const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * Применяет тему без анимаций. Иначе элементы с transition-colors/transition-all
 * (кнопки, теги, карточки) плавно меняют цвет текста и иконок уже после
 * мгновенной смены фона — смена темы выглядит «с запозданием».
 */
const applyThemeWithoutTransitions = (theme: Theme) => {
  const style = document.createElement('style')
  style.textContent = '*, *::before, *::after { transition: none !important; }'
  document.head.append(style)

  applyTheme(theme)

  // Принудительный reflow: браузер применяет новые стили, пока переходы выключены
  void window.getComputedStyle(document.body).opacity
  style.remove()
}

export const setTheme = (theme: Theme) => {
  currentTheme = theme
  applyThemeWithoutTransitions(theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Не сохранилось — тема всё равно действует до перезагрузки
  }
  for (const listener of listeners) listener()
}

/** Текущая тема вне React (для тасок). */
export const getTheme = () => currentTheme

/** Текущая тема приложения: светлая или тёмная. */
export const useTheme = () => useSyncExternalStore(subscribe, () => currentTheme)
