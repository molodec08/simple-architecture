import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import { usePresenter } from './usePresenter'

export const ThemeSwitcher = () => {
  const { isDark, ariaLabel, onToggle } = usePresenter()

  return (
    <Button variant="outline" size="icon-sm" aria-label={ariaLabel} title={ariaLabel} onClick={onToggle}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
