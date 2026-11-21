const PLACEHOLDER_COUNT = 10

export const usePresenter = () => ({
  placeholders: Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => index),
})
