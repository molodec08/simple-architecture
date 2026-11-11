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
  showList: {
    title: 'All shows',
    page: 'Page {{page}}',
    prev: 'Previous',
    next: 'Next',
    empty: 'No shows on this page.',
  },
  showSearch: {
    placeholder: 'Search shows…',
    resultsTitle: 'Search results for “{{query}}”',
    empty: 'Nothing found for “{{query}}”.',
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
