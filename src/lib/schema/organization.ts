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
      'https://se.pinterest.com/battrehy/L',
      'https://www.instagram.com/battrehy/',
      'https://www.facebook.com/profile.php?id=61592716316970',
    ],
    publisher: {
      '@type': 'Person',
      name: 'Goran Billingskog',
      url: 'https://billingskog.com',              // the publisher's authority domain
    },
  }
}
