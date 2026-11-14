import { Chip } from '@/shared/ui/kit/chip'
import { type GenreFilterProps, usePresenter } from './logic/usePresenter'

/** Жанры текущей выдачи в виде тегов: выбор жанра фильтрует список. */
export const GenreFilter = (props: GenreFilterProps) => {
  const { label, allText, isAllSelected, onReset, items } = usePresenter(props)

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      <Chip selected={isAllSelected} onClick={onReset}>
        {allText}
      </Chip>
      {items.map((item) => (
        <Chip key={item.name} selected={item.isSelected} onClick={item.onClick}>
          <span className="size-2 rounded-full ring-2 ring-background/60" style={item.dotStyle} />
          {item.name}
          <span className="text-xs opacity-60">{item.count}</span>
        </Chip>
      ))}
    </div>
  )
}
