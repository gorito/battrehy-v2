import { Search } from "lucide-react";
import Link from 'next/link';
import { getTreatments, getFeaturedClinics } from '@/lib/supabase/actions/queries';
import HomeSearch from '@/components/home/HomeSearch';

export default async function Home() {
  const [treatments, featuredClinics] = await Promise.all([
    getTreatments(),
    getFeaturedClinics(12)
  ]);

  return (
    <main className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-charcoal-900 mb-6 leading-tight">
          Sveriges tryggaste guide för skönhetskliniker
        </h1>
        <p className="text-lg text-charcoal-700 mb-8">
          Jämför och boka estetiska behandlingar hos certifierade kliniker i din stad.
        </p>

        <HomeSearch />

      </div>

      {/* Treatments Grid */}
      <div className="max-w-6xl w-full mx-auto pb-16 mt-8">
        <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">Populära Behandlingar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map(treatment => (
            <Link
              key={treatment.id}
              href={`/behandlingar/${treatment.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all block bg-charcoal-900"
            >
              {/* Background Image */}
              {treatment.image_url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                  style={{ backgroundImage: `url(${treatment.image_url})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-900 opacity-80" />
              )}

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {treatment.name}
                </h3>

                {/* Rollover Description */}
                <div className="overflow-hidden">
                  <p className="text-white/90 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {treatment.description || `Utforska certifierade kliniker som erbjuder ${treatment.name.toLowerCase()} nära dig.`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Clinics Grid */}
      <div className="max-w-6xl w-full mx-auto pb-16 mt-8">
        <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">Utvalda Kliniker</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredClinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col group"
            >
              <div
                className="h-40 w-full bg-cover bg-center bg-gray-100 group-hover:scale-105 transition-transform duration-500"
                style={clinic.primary_image_url ? { backgroundImage: `url(${clinic.primary_image_url})` } : {}}
              />

              <div className="p-5 flex-grow flex flex-col relative bg-white z-10">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1">{clinic.name}</h3>
                  {clinic.tier === 'premium' && <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">Premium</span>}
                  {clinic.tier === 'verified' && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">Verifierad</span>}
                </div>

                <p className="text-sm text-gray-500 mb-4">{clinic.city}</p>

                <div className="mt-auto flex gap-2 flex-wrap">
                  {clinic.treatments?.slice(0, 2).map((t: any) => (
                    <span key={t.id} className="text-[10px] bg-gray-50 border border-gray-200 px-2 py-1 text-gray-600 rounded-md whitespace-nowrap">
                      {t.name}
                    </span>
                  ))}
                  {clinic.treatments && clinic.treatments.length > 2 && (
                    <span className="text-[10px] bg-gray-50 border border-gray-200 px-2 py-1 text-gray-500 rounded-md">
                      +{clinic.treatments.length - 2} fler
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blogg"
            className="inline-block bg-white text-charcoal-900 border border-gray-200 px-8 py-3 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 transition-all font-bold"
          >
            Läs vår Blogg &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
