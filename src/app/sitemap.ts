import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // In Phase 2, this will dynamically fetch cities, treatments, and clinics from Supabase
    // and map them to their respective URLs. 

    const baseUrl = 'https://battrehy.se';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/for-kliniker`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/om-oss`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/kontakt`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
