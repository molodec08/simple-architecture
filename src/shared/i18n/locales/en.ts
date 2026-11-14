import type { Translations } from './ru'

export const en: Translations = {
  common: {
    appTitle: 'TV Shows',
    backToList: 'Back to list',
    retry: 'Retry',
    errorTitle: 'Something went wrong',
    errorDescription: 'Failed to load data. Please try again.',
    notFoundTitle: 'Page not found',
    notFoundDescription: 'This page does not exist.',
    language: 'Language',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
  },
  show: {
    noImage: 'No poster',
    noRating: 'No rating',
    status: {
      Running: 'Running',
      Ended: 'Ended',
      'To Be Determined': 'To be determined',
      'In Development': 'In development',
    },
  },
  home: {
    heroTitle: 'Find your',
    heroAccent: 'next favorite show',
    heroSubtitle: 'Thousands of shows from the TVmaze catalog: search by title and filter by genre.',
  },
  showList: {
    title: 'All shows',
    empty: 'No shows on this page.',
  },
  pagination: {
    page: 'Page {{page}}',
    pageOf: 'Page {{page}} of {{total}}',
    prev: 'Previous',
    next: 'Next',
  },
  showSearch: {
    placeholder: 'Search shows…',
    resultsTitle: 'Search results for “{{query}}”',
    empty: 'Nothing found for “{{query}}”.',
    found: 'Found: {{total}}',
    genresLabel: 'Filter by genre',
    allGenres: 'All genres',
  },
  showDetails: {
    premiered: 'Premiered',
    ended: 'Ended',
    network: 'Network',
    language: 'Language',
    runtime: 'Runtime',
    runtimeValue: '{{count}} min',
    officialSite: 'Official site',
    cast: 'Cast',
    asCharacter: 'as {{name}}',
    noSummary: 'No summary available.',
    notFound: 'Show not found.',
  },
}
