'use client';

import { useState } from 'react';
import Link from 'next/link';
import { slugifyCity } from '@/lib/utils';

type Props = {
  cities: string[];
  cityCounts: Record<string, number>;
  treatments: any[];
};

export default function HomeBrowse({ cities, cityCounts, treatments }: Props) {
  const [activeTab, setActiveTab] = useState<'stad' | 'behandling'>('stad');

  // Popular Cities are already sorted/sliced by parent for hydration safety
  const popularCities = cities;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 flex overflow-hidden">
          <button
            onClick={() => setActiveTab('stad')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === 'stad'
                ? 'bg-[#e8234a] text-white shadow-md'
                : 'text-charcoal-600 hover:bg-rose-50'
            }`}
          >
            Stad
          </button>
          <button
            onClick={() => setActiveTab('behandling')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === 'behandling'
                ? 'bg-[#e8234a] text-white shadow-md'
                : 'text-charcoal-600 hover:bg-rose-50'
            }`}
          >
            Behandling
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
        {activeTab === 'stad' ? (
          <div className="space-y-8 text-center">
            {/* Popular Cities */}
            <div>
              <div className="flex flex-wrap justify-center gap-3">
                {popularCities.map((city) => (
                  <Link
                    key={city}
                    href={`/kliniker/${slugifyCity(city)}`}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-charcoal-700 hover:border-[#e8234a] hover:text-[#e8234a] transition-all shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e8234a] opacity-60 group-hover:opacity-100" />
                    {city}
                    <span className="text-xs text-charcoal-400 font-normal group-hover:text-[#e8234a]/70">({cityCounts[city] || 0})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-6 px-1">Alla Behandlingar</h3>
            <div className="flex flex-wrap gap-3">
              {treatments.map((treatment) => (
                <Link
                  key={treatment.id}
                  href={`/behandlingar/${treatment.slug}`}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-charcoal-700 hover:border-[#e8234a] hover:text-[#e8234a] transition-all shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8234a] opacity-60 group-hover:opacity-100" />
                  {treatment.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
