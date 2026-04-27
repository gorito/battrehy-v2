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
        { url: `${baseUrl}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/behandlingar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blogg`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ];

    // Individual Clinic Pages
    const clinicPages: MetadataRoute.Sitemap = clinics.map((clinic) => {
        const citySlug = slugifyCity(clinic.city);
        return {
            url: `${baseUrl}/kliniker/${citySlug}/${clinic.slug}`,
            lastModified: new Date(clinic.updated_at || clinic.created_at),
            changeFrequency: 'weekly',
            priority: 0.7,
        };
    });

    // Individual Treatment Pages
    const treatmentPages: MetadataRoute.Sitemap = treatments.map((treatment) => ({
        url: `${baseUrl}/behandlingar/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // City Pages (List of clinics in a city)
    const allCityNames = Array.from(new Set([
        ...dbCities.map(c => c.name),
        ...uniqueCityNames
    ]));

    const cityPages: MetadataRoute.Sitemap = allCityNames.map((cityName) => ({
        url: `${baseUrl}/kliniker/${slugifyCity(cityName)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Combination Pages: City + Treatment
    // We only generate combinations that actually have at least one clinic to avoid "thin content" pages
    const comboPages: MetadataRoute.Sitemap = [];
    
    allCityNames.forEach(cityName => {
        const citySlug = slugifyCity(cityName);
        const cityClinics = clinics.filter(c => c.city.toLowerCase() === cityName.toLowerCase());
        
        // Find treatments available in this specific city
        const availableTreatments = Array.from(new Set(
            cityClinics.flatMap(c => c.treatments?.map(t => t.slug) || [])
        ));

        availableTreatments.forEach(tSlug => {
            if (tSlug) {
                comboPages.push({
                    url: `${baseUrl}/kliniker/${citySlug}/${tSlug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.6,
                });
            }
        });
    });

    return [...staticPages, ...clinicPages, ...treatmentPages, ...cityPages, ...comboPages];
}
