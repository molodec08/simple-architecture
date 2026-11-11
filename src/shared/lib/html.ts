/** Превращает HTML-строку (например, summary из TVmaze) в обычный текст. */
export const htmlToText = (html: string | null | undefined): string => {
  if (!html) return ''
  return new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() ?? ''
}
