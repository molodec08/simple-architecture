import { SearchIcon } from 'lucide-react'
import { Input } from '@/shared/ui/kit/input'
import { type SearchInputProps, usePresenter } from './logic/usePresenter'

export const SearchInput = (props: SearchInputProps) => {
  const { draft, placeholder, onDraftChange } = usePresenter(props)

  return (
    <div className="group relative mx-auto w-full max-w-xl">
      <div
        aria-hidden
        className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-highlight opacity-30 blur transition-opacity group-focus-within:opacity-70"
      />
      <SearchIcon className="pointer-events-none absolute top-1/2 left-5 z-10 size-5 -translate-y-1/2 text-primary" />
      <Input
        type="search"
        value={draft}
        onChange={onDraftChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="relative h-14 rounded-full border-transparent bg-card pr-6 pl-13 text-base shadow-xl shadow-primary/10 md:text-base dark:bg-card"
      />
    </div>
  )
}
