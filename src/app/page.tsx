import Link from 'next/link';
import { getTreatments, getFeaturedClinics } from '@/lib/supabase/actions/queries';
import HomeSearch from '@/components/home/HomeSearch';
import { slugifyCity } from '@/lib/utils';
import { MapPin, ChevronDown } from 'lucide-react';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const userCityHeader = headersList.get('x-vercel-ip-city');
  // Fallback to Stockholm if no Vercel city header is found (e.g. local dev)
  const userCity = userCityHeader ? decodeURIComponent(userCityHeader) : 'Stockholm';

  const [treatments] = await Promise.all([
    getTreatments()
  ]);

  let featuredClinics = await getFeaturedClinics(12, userCity);
  let displayCity = userCity;

  // Fallback to general featured clinics if no clinics in location
  if (featuredClinics.length === 0) {
    featuredClinics = await getFeaturedClinics(12);
    displayCity = 'Stockholm'; // Default to Stockholm if we literally have no idea or no clinics
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'battrehy.se',
      url: 'https://battrehy.se',
      description: 'Sveriges tryggaste guide för skönhetskliniker – jämför och boka estetiska behandlingar hos certifierade kliniker.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'battrehy.se',
      url: 'https://battrehy.se',
      email: 'info@battrehy.se'
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffafa] flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <div className="w-full pt-24 pb-16 px-8 text-center bg-gradient-to-b from-rose-50/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-charcoal-900 mb-6 leading-[1.1] tracking-tight">
            Sveriges tryggaste guide för <span className="text-[#e8234a]">skönhetskliniker</span>
          </h1>
          <p className="text-xl text-charcoal-600 mb-10 font-medium">
            Jämför och boka estetiska behandlingar hos certifierade kliniker i din stad.
          </p>

          <HomeSearch />
        </div>
      </div>

      {/* Featured Clinics Grid */}
      <div className="max-w-7xl w-full mx-auto px-8 pb-16 mt-8">
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-center mb-1">
            <Link href="/sok" className="text-sm font-bold text-charcoal-400 flex items-center gap-1.5 hover:text-charcoal-600 transition-colors group">
              <MapPin size={14} className="text-[#e8234a]" />
              Baserat på din plats &mdash; <span className="text-[#e8234a] border-b border-dashed border-[#e8234a]/30 group-hover:border-[#e8234a] transition-colors">{displayCity}</span>
              <ChevronDown size={14} className="text-charcoal-400 group-hover:translate-y-0.5 transition-transform" />
            </Link>
            
            <Link href="/sok" className="text-[#e8234a] font-bold text-sm hover:underline flex items-center gap-1.5 group">
              Visa alla <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
          <h2 className="text-[28px] md:text-3xl font-black text-charcoal-900 leading-tight">
            Utvalda kliniker nära dig
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredClinics.map((clinic) => (
            <Link
              key={clinic.id}
              href={`/kliniker/${slugifyCity(clinic.city)}/${clinic.slug}`}
              className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(232,35,74,0.08)] transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col group hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-gray-100 group-hover:scale-110 transition-transform duration-700"
                  style={clinic.primary_image_url ? { backgroundImage: `url(${clinic.primary_image_url})` } : {}}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {clinic.tier === 'premium' && <span className="bg-[#e8234a] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">Premium</span>}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-black text-charcoal-900 text-lg line-clamp-1 group-hover:text-[#e8234a] transition-colors">{clinic.name}</h3>
                </div>

                <p className="text-sm text-charcoal-400 font-bold mb-6 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#e8234a]" />
                  {clinic.city}
                </p>

                <div className="mt-auto flex gap-2 flex-wrap">
                  {clinic.treatments?.slice(0, 2).map((t: any) => (
                    <span key={t.id} className="text-[10px] bg-gray-50 border border-gray-200 px-3 py-1.5 text-charcoal-600 rounded-lg font-bold uppercase tracking-wider">
                      {t.name}
                    </span>
                  ))}
                  {clinic.treatments && clinic.treatments.length > 2 && (
                    <span className="text-[10px] text-charcoal-300 font-bold px-1 self-center">
                      +{clinic.treatments.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Treatments Grid */}
      <div className="max-w-7xl w-full mx-auto px-8 pb-32 mt-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-charcoal-900 mb-2">Populära behandlingar</h2>
            <p className="text-charcoal-500">Utforska våra mest eftertraktade skönhetsingrepp</p>
          </div>
          <Link href="/behandlingar" className="text-[#e8234a] font-bold hover:underline text-sm">Visa alla &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.slice(0, 6).map(treatment => (
            <Link
              key={treatment.id}
              href={`/behandlingar/${treatment.slug}`}
              className="group relative h-72 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block bg-charcoal-900"
            >
              {treatment.image_url ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                  style={{ backgroundImage: `url(${treatment.image_url})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-900 opacity-80" />
              )}

              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="text-2xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {treatment.name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {treatment.description || `Utforska certifierade kliniker som erbjuder ${treatment.name.toLowerCase()} nära dig.`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="w-full bg-charcoal-900 py-24 px-8 text-center">
        <h2 className="text-4xl font-black text-white mb-8">Redo att hitta din nästa behandling?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/blogg"
            className="px-10 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all border border-white/10"
          >
            Läs vår Blogg
          </Link>
          <Link
            href="/kontakt"
            className="px-10 py-4 bg-[#e8234a] text-white rounded-full font-bold hover:bg-[#ff3b60] transition-all shadow-xl shadow-rose-900/20"
          >
            Kontakta oss
          </Link>
        </div>
      </div>
    </main>
  );
}
