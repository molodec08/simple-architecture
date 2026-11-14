import { ImageOffIcon } from 'lucide-react'
import { type ShowPosterProps, usePresenter } from './logic/usePresenter'

export const ShowPoster = (props: ShowPosterProps) => {
  const { src, alt, hasImage, imageClassName, placeholderClassName, noImageText } = usePresenter(props)

  if (!hasImage) {
    return (
      <div className={placeholderClassName}>
        <ImageOffIcon className="size-8" />
        {noImageText}
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" className={imageClassName} />
}
