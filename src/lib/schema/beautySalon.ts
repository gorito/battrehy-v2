import { stripUndefined } from './utils';
import { Clinic } from '../supabase/types';
import { slugifyCity } from '../utils'; // assuming slugifyCity is available here, let's verify later where it's located

const BASE_URL = 'https://battrehy.se';

// Converts ["Mo-Fr 09:00-18:00", "Sa 10:00-15:00"] to OpeningHoursSpecification
function parseOpeningHours(hours: string[]) {
  const dayMap: Record<string, string[]> = {
    Mo: ['Monday'], Tu: ['Tuesday'], We: ['Wednesday'],
    Th: ['Thursday'], Fr: ['Friday'], Sa: ['Saturday'], Su: ['Sunday'],
  }

  return hours.flatMap((spec) => {
    const [days, time] = spec.split(' ')
    const [open, close] = time.split('-')
    const [startDay, endDay] = days.split('-')

    const dayKeys = endDay
      ? Object.keys(dayMap).slice(
          Object.keys(dayMap).indexOf(startDay),
          Object.keys(dayMap).indexOf(endDay) + 1
        )
      : [startDay]

    return dayKeys.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dayMap[d],
      opens: open,
      closes: close,
    }))
  })
}

export function buildBeautySalonSchema(clinic: Clinic) {
  const citySlug = slugifyCity(clinic.city);
  const url = `${BASE_URL}/kliniker/${citySlug}/${clinic.slug}/`;

  // Use dual @type for clinics that provide medical aesthetics
  const is_medical_aesthetic = clinic.is_rfem_member || clinic.treatments?.some(t => /laser|botox|filler|injektion/i.test(t.name));
  const schemaType = is_medical_aesthetic
    ? ['BeautySalon', 'MedicalBusiness']
    : 'BeautySalon';

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${url}#clinic`,
    name: clinic.name,
    url,
    description: clinic.description,
    image: clinic.primary_image_url,
    telephone: clinic.phone,
    email: clinic.email,
    sameAs: clinic.website ? [clinic.website] : undefined,

    address: clinic.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: clinic.address,
          addressLocality: clinic.city,
          addressCountry: 'SE',
        }
      : undefined,

    geo: clinic.latitude && clinic.longitude
      ? {
          '@type': 'GeoCoordinates',
          latitude: clinic.latitude,
          longitude: clinic.longitude,
        }
      : undefined,

    openingHoursSpecification: clinic.opening_hours?.length
      ? parseOpeningHours(clinic.opening_hours)
      : undefined,

    hasOfferCatalog: clinic.treatments?.length
      ? {
          '@type': 'OfferCatalog',
          name: 'Behandlingar',
          itemListElement: clinic.treatments.map((t) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: t.name, // mapping from Treatment object to name string
            },
          })),
        }
      : undefined,

    aggregateRating:
      clinic.rating_value && clinic.rating_count
        ? {
            '@type': 'AggregateRating',
            ratingValue: clinic.rating_value,
            reviewCount: clinic.rating_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,

    priceRange: clinic.price_range,

    // Publisher cross-link — see Section 3
    isPartOf: {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  return stripUndefined(schema);
}
