import { MetadataRoute } from 'next';
import { getClinics, getTreatments, getCities } from '@/lib/supabase/actions/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://battrehy.se';

    // Fetch all dynamic content in parallel
    const [clinicsResponse, treatments, cities] = await Promise.all([
        getClinics({ limit: 2000 }), // High limit for sitemap
        getTreatments(),
        getCities()
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

    const clinicPages: MetadataRoute.Sitemap = clinics.map((clinic) => ({
        url: `${baseUrl}/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`,
        lastModified: new Date(clinic.updated_at || clinic.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const treatmentPages: MetadataRoute.Sitemap = treatments.map((treatment) => ({
        url: `${baseUrl}/behandlingar/${treatment.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
        url: `${baseUrl}/stad/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticPages, ...clinicPages, ...treatmentPages, ...cityPages];
}
