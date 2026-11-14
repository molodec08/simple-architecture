/**
 * Стабильный оттенок (0–359) для строки: одна и та же строка — всегда один цвет.
 * Удобно, чтобы раскрашивать теги без ручной палитры.
 */
export const hashHue = (text: string): number => {
  let hash = 0
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) | 0
  // Золотой угол разносит соседние хэши по кругу оттенков
  return Math.round(Math.abs(hash * 137.508) % 360)
}
