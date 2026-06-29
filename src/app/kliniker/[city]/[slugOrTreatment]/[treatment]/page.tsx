import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getTreatments, getClinics, getCities, getUniqueCities } from '@/lib/supabase/actions/queries';
import { slugifyCity } from '@/lib/utils';
import CityTreatmentView from '@/components/seo/CityTreatmentView';
import { stockholmSeoData, ALIAS_MAP } from '@/lib/seo/stockholm-seo';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string; slugOrTreatment: string; treatment: string }> | { city: string; slugOrTreatment: string; treatment: string }
};

// Normalize names for presentation
const NEIGHBORHOOD_NAMES: Record<string, string> = {
    'ostermalm': 'Östermalm',
    'sodermalm': 'Södermalm',
    'vasastan': 'Vasastan',
    'stureplan': 'Stureplan',
    'norrmalm-kungsholmen': 'Norrmalm & Kungsholmen',
    'gamla-stan': 'Gamla Stan'
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const city = decodeURIComponent(resolvedParams.city);
    const slugOrTreatment = decodeURIComponent(resolvedParams.slugOrTreatment);
    const treatment = decodeURIComponent(resolvedParams.treatment);

    const normalizedCity = city.toLowerCase();
    const normalizedNeighborhood = slugOrTreatment.toLowerCase();
    const normalizedTreatment = treatment.toLowerCase();

    // Look up in custom Stockholm SEO data pack
    const seoKey = `${normalizedCity}/${normalizedNeighborhood}/${normalizedTreatment}`;
    const customSeo = stockholmSeoData[seoKey];

    if (customSeo) {
        return {
            title: customSeo.title,
            description: customSeo.description,
            alternates: {
                canonical: `/kliniker/${normalizedCity}/${normalizedNeighborhood}/${normalizedTreatment}`,
            }
        };
    }

    // Fallback if not specifically configured in SEO pack
    const neighborhoodName = NEIGHBORHOOD_NAMES[normalizedNeighborhood] || normalizedNeighborhood;
    const treatmentName = normalizedTreatment.replace(/-/g, ' ');

    return {
        title: `${treatmentName.toUpperCase()} i ${neighborhoodName} — Boka på Bättrehy`,
        description: `Jämför kliniker som erbjuder ${treatmentName} i ${neighborhoodName}, Stockholm. Se betyg, boka tid och hitta rätt hudterapeut.`,
        alternates: {
            canonical: `/kliniker/${normalizedCity}/${normalizedNeighborhood}/${normalizedTreatment}`,
        }
    };
}

export default async function NeighborhoodTreatmentPage({ params }: Props) {
    const resolvedParams = await params;
    const citySlug = decodeURIComponent(resolvedParams.city);
    const neighborhoodSlug = decodeURIComponent(resolvedParams.slugOrTreatment);
    const treatmentSlug = decodeURIComponent(resolvedParams.treatment);

    const asciiCitySlug = slugifyCity(citySlug);
    const asciiNeighborhoodSlug = slugifyCity(neighborhoodSlug);
    const asciiTreatmentSlug = slugifyCity(treatmentSlug);

    // Redirect to normalized/ASCII URL if there are casing or Swedish character mismatches
    if (citySlug !== asciiCitySlug || neighborhoodSlug !== asciiNeighborhoodSlug || treatmentSlug !== asciiTreatmentSlug) {
        permanentRedirect(`/kliniker/${asciiCitySlug}/${asciiNeighborhoodSlug}/${asciiTreatmentSlug}`);
    }

    // Resolve treatment (using aliases if necessary)
    const resolvedTreatmentSlug = ALIAS_MAP[treatmentSlug] || treatmentSlug;

    const [treatments, cities, uniqueCityNames, clinicsResponse] = await Promise.all([
        getTreatments(),
        getCities(),
        getUniqueCities(),
        getClinics({ limit: 1000 })
    ]);

    let treatmentObj = treatments.find(t => t.slug === resolvedTreatmentSlug);
    if (!treatmentObj) {
        treatmentObj = treatments.find(t => t.name.toLowerCase() === resolvedTreatmentSlug.replace(/-/g, ' '));
    }

    if (!treatmentObj) {
        // Fallback placeholder object if treatment exists in SEO list but not in DB
        treatmentObj = {
            id: 'fallback',
            name: treatmentSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: treatmentSlug,
            description: ''
        } as any;
    }

    let cityObj = cities.find(c => slugifyCity(c.name) === citySlug);
    if (!cityObj && citySlug === 'stockholm') {
        cityObj = { name: 'Stockholm', slug: 'stockholm' } as any;
    }

    if (!cityObj) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === citySlug);
        if (cityName) cityObj = { name: cityName, slug: slugifyCity(cityName) } as any;
    }

    if (!cityObj) {
        notFound();
    }

    const neighborhoodName = NEIGHBORHOOD_NAMES[neighborhoodSlug] || neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Filter clinics that match both the city, the neighborhood column AND the treatment
    const filteredClinics = clinicsResponse.data.filter(c => {
        const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
        const neighborhoodMatch = c.neighborhood?.toLowerCase() === neighborhoodSlug.toLowerCase();
        
        const treatmentsArray = (c as any).treatments || (c as any).clinic_treatments?.map((ct: any) => ct.treatments) || [];
        const treatmentMatch = treatmentsArray.some((t: any) => 
            t.slug === resolvedTreatmentSlug || t.slug === treatmentSlug
        );
        const serviceMatch = c.extracted_services?.some((s: string) => 
            s.toLowerCase().includes(treatmentObj!.name.toLowerCase()) || 
            s.toLowerCase().includes(treatmentSlug.toLowerCase())
        );

        return cityMatch && neighborhoodMatch && (treatmentMatch || serviceMatch);
    });

    // Custom Editorial and H1 from SEO config if available
    const seoKey = `${citySlug}/${neighborhoodSlug}/${treatmentSlug}`;
    const customSeo = stockholmSeoData[seoKey];

    return (
        <CityTreatmentView 
            city={cityObj} 
            treatment={treatmentObj as any} 
            clinics={filteredClinics} 
            neighborhood={{ name: neighborhoodName, slug: neighborhoodSlug }}
            customH1={customSeo?.h1}
            customEditorial={customSeo?.editorial}
        />
    );
}
