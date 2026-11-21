import { getTheme, setTheme } from '@/shared/lib'

/** Таска «переключить тему»: читает текущую тему прямо из стора темы и меняет её на противоположную. */
export const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')
