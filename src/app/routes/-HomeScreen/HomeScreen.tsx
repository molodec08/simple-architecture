import { Hero } from './Hero'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'
import { ShowList } from './ShowList'
import { usePresenter } from './logic/usePresenter'

export const HomeScreen = () => {
  const { query, page, genre, isSearching, onQueryChange, onPageChange, onGenreChange } = usePresenter()

  return (
    <div className="flex flex-col gap-8">
      <Hero isCompact={isSearching}>
        <SearchInput value={query} onChange={onQueryChange} />
      </Hero>
      {isSearching ? (
        <SearchResults
          query={query}
          page={page}
          genre={genre}
          onPageChange={onPageChange}
          onGenreChange={onGenreChange}
        />
      ) : (
        <ShowList page={page} genre={genre} onPageChange={onPageChange} onGenreChange={onGenreChange} />
      )}
    </div>
  )
}
