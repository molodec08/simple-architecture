import { Link, Outlet } from '@tanstack/react-router'
import { TvIcon } from 'lucide-react'
import { Toaster } from '@/shared/ui/kit/sonner'
import { Devtools } from './Devtools'
import { FavoritesLink } from './FavoritesLink'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { usePresenter } from './logic/usePresenter'

export const RootLayout = () => {
  const { appTitle, toasterTheme } = usePresenter()

  return (
    <div className="relative isolate min-h-svh overflow-x-clip bg-background text-foreground">
      {/* Декоративное цветное свечение за контентом */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] overflow-hidden">
        <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-[70%] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 left-1/2 size-[32rem] translate-x-[5%] rounded-full bg-highlight/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-highlight text-white shadow-lg shadow-primary/30">
              <TvIcon className="size-5" />
            </span>
            {appTitle}
          </Link>
          <div className="flex items-center gap-2">
            <FavoritesLink />
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>
      <Toaster theme={toasterTheme} position="bottom-center" richColors />
      <Devtools />
    </div>
  )
}
