import { MetadataRoute } from 'next';
import { getClinics, getTreatments, getCities, getUniqueCities } from '@/lib/supabase/actions/queries';
import { slugifyCity } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://battrehy.se';

    // Fetch all dynamic content in parallel
    const [clinicsResponse, treatments, dbCities, uniqueCityNames] = await Promise.all([
        getClinics({ limit: 2000 }), // High limit for sitemap
        getTreatments(),
        getCities(),
        getUniqueCities()
    ]);

    const clinics = clinicsResponse.data;

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/for-kliniker`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/om-oss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/behandlingar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blogg`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ];

    const clinicPages: MetadataRoute.Sitemap = clinics.map((clinic) => {
        // Use slugifyCity to ensure ASCII slugs consistent with Google requirements
        const citySlug = slugifyCity(clinic.city);
        
        return {
            url: `${baseUrl}/kliniker/${citySlug}/${clinic.slug}`,
            lastModified: new Date(clinic.updated_at || clinic.created_at),
            changeFrequency: 'weekly',
            priority: 0.7,
        };
    });

    const treatmentPages: MetadataRoute.Sitemap = treatments.map((treatment) => ({
        url: `${baseUrl}/behandlingar/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Generate city pages for EVERY unique city found in clinics OR in the cities table
    // This ensures no city page is missing from Google's index
    const allCityNames = Array.from(new Set([
        ...dbCities.map(c => c.name),
        ...uniqueCityNames
    ]));

    const cityPages: MetadataRoute.Sitemap = allCityNames.map((cityName) => ({
        url: `${baseUrl}/stad/${slugifyCity(cityName)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticPages, ...clinicPages, ...treatmentPages, ...cityPages];
}
