export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://battrehy.se/#website',
    name: 'Bättrehy',
    url: 'https://battrehy.se',
    publisher: {
      '@id': 'https://battrehy.se/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://battrehy.se/sok?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
