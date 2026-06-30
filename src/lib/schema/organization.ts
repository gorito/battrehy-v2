export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://battrehy.se/#organization',   // ← permanent ID anchor
    name: 'Bättrehy',
    url: 'https://battrehy.se',
    logo: {
      '@type': 'ImageObject',
      url: 'https://battrehy.se/logo.png',
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://www.instagram.com/battrehy',       // add actual social URLs
      'https://www.linkedin.com/company/battrehy',
    ],
    publisher: {
      '@type': 'Person',
      name: 'Goran Billingskog',
      url: 'https://billingskog.se',              // the publisher's authority domain
    },
  }
}
