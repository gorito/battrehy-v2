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
  let postalCode: string | undefined = undefined;
  let streetAddress = clinic.address;

  if (clinic.address) {
    // Match Swedish postal code (e.g., "111 20" or "11120")
    const postalMatch = clinic.address.match(/\b\d{3}\s?\d{2}\b/);
    if (postalMatch) {
      postalCode = postalMatch[0];
      const index = clinic.address.indexOf(postalCode);
      if (index > 0) {
        streetAddress = clinic.address.substring(0, index).replace(/,\s*$/, '').trim();
      }
    }
  }

  const citySlug = slugifyCity(clinic.city);
  const profileUrl = `${BASE_URL}/kliniker/${citySlug}/${clinic.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': profileUrl,
    name: clinic.name,
    description: clinic.ai_description || clinic.description || undefined,
    telephone: clinic.phone || undefined,
    url: clinic.website || undefined,
    address: streetAddress ? {
      '@type': 'PostalAddress',
      streetAddress: streetAddress,
      addressLocality: clinic.city,
      addressCountry: 'SE',
      postalCode: postalCode || undefined,
    } : undefined,
    areaServed: clinic.city || undefined,
    priceRange: clinic.price_range || undefined,
  };

  return stripUndefined(schema);
}
