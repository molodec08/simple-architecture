export type ResultGridSkeletonProps = {
  /** Сколько карточек-заглушек показать — столько же, сколько на странице */
  count: number
}

export const usePresenter = ({ count }: ResultGridSkeletonProps) => ({
  placeholders: Array.from({ length: count }, (_, index) => index),
})
