import { stripUndefined } from './utils';

const BASE_URL = 'https://battrehy.se';

export interface ClinicListItem {
  name: string;
  slug: string;
  city_slug: string;
}

export interface ItemListOptions {
  pageTitle: string;       // e.g. "Hudvårdskliniker i Stockholm"
  pageUrl: string;         // e.g. "https://battrehy.se/kliniker/stockholm/"
  clinics: ClinicListItem[];
}

export function buildItemListSchema({ pageTitle, pageUrl, clinics }: ItemListOptions) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    name: pageTitle,
    url: pageUrl,
    numberOfItems: clinics.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: clinics.map((clinic, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/kliniker/${clinic.city_slug}/${clinic.slug}/`,
      name: clinic.name,
    })),
  };

  return stripUndefined(schema);
}
