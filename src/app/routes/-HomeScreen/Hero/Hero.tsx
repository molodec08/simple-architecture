import { type HeroProps, usePresenter } from './usePresenter'

/** Шапка главной: заголовок с градиентом и поле поиска. При поиске заголовок сворачивается. */
export const Hero = (props: HeroProps) => {
  const { title, accent, subtitle, children, isCompact, sectionClassName, headingClassName } = usePresenter(props)

  return (
    <section className={sectionClassName}>
      <div className={headingClassName} aria-hidden={isCompact} inert={isCompact}>
        <div className="flex min-h-0 flex-col items-center gap-5 overflow-hidden pb-7">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {title}{' '}
            <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">{accent}</span>
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </div>
      </div>
      <div className="w-full">{children}</div>
    </section>
  )
}
