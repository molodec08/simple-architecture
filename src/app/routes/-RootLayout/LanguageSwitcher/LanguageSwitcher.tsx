import { LanguagesIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select'
import { usePresenter } from './logic/usePresenter'

export const LanguageSwitcher = () => {
  const { value, ariaLabel, options, onValueChange } = usePresenter()

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger size="sm" aria-label={ariaLabel}>
        <LanguagesIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
