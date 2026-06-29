import { MetadataRoute } from 'next';
import { getClinics, getTreatments, getCities, getUniqueCities } from '@/lib/supabase/actions/queries';
import { slugifyCity } from '@/lib/utils';
import { stockholmSeoData } from '@/lib/seo/stockholm-seo';

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
        { url: `${baseUrl}/blogg/ansiktsbehandling-den-kompletta-guiden`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blogg/botoxbehandling-den-kompletta-guiden`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blogg/fillerbehandling-den-kompletta-guiden`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/blogg/estetisk-klinik`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
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

    // Only include city pages with 3+ clinics (Definition of small city is fewer than 3 clinics)
    const largeCityNames = allCityNames.filter(cityName => {
        const cityClinics = clinics.filter(c => c.city.toLowerCase() === cityName.toLowerCase());
        return cityClinics.length >= 3;
    });

    const cityPages: MetadataRoute.Sitemap = largeCityNames.map((cityName) => ({
        url: `${baseUrl}/kliniker/${slugifyCity(cityName)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // Combination Pages: City + Treatment
    // We only generate combinations that actually have at least two clinics to avoid "thin content" / 404 pages
    const comboPages: MetadataRoute.Sitemap = [];
    
    largeCityNames.forEach(cityName => {
        const citySlug = slugifyCity(cityName);
        const cityClinics = clinics.filter(c => c.city.toLowerCase() === cityName.toLowerCase());
        
        // Find treatments available in this specific city
        const availableTreatments = Array.from(new Set(
            cityClinics.flatMap(c => c.treatments?.map(t => t.slug) || [])
        ));

        availableTreatments.forEach(tSlug => {
            if (tSlug) {
                // Count clinics in this city offering the treatment
                const matchingClinicsCount = cityClinics.filter(c => {
                    const treatmentsArray = (c as any).treatments || (c as any).clinic_treatments?.map((ct: any) => ct.treatments) || [];
                    const treatmentMatch = treatmentsArray.some((t: any) => t.slug === tSlug);
                    const serviceMatch = c.extracted_services?.some((s: string) => 
                        s.toLowerCase().includes(tSlug.replace(/-/g, ' '))
                    );
                    return treatmentMatch || serviceMatch;
                }).length;

                // Only include if there are 2 or more clinics (since 0 or 1 returns 404)
                if (matchingClinicsCount >= 2) {
                    comboPages.push({
                        url: `${baseUrl}/kliniker/${citySlug}/${tSlug}`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly',
                        priority: 0.6,
                    });
                }
            }
        });
    });

    // Custom Stockholm long-tail SEO pages
    const stockholmSeoPages: MetadataRoute.Sitemap = Object.keys(stockholmSeoData).map((key) => ({
        url: `${baseUrl}/kliniker/${key}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
    }));

    return [...staticPages, ...clinicPages, ...treatmentPages, ...cityPages, ...comboPages, ...stockholmSeoPages];
}
