import { getAdminStats } from '@/lib/supabase/actions/queries';
import { Building2, Crown, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Välkommen till Admin!</h1>
                <p className="text-gray-500">Här är en översikt över plattformens status just nu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Clinics */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Building2 size={80} />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
                            <Building2 size={24} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Totalt antal kliniker</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                        <span className="text-gray-400 text-sm">st</span>
                    </div>
                    <Link href="/admin/kliniker" className="mt-6 flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">
                        Visa alla <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Premium Clinics */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-rose-500">
                        <Crown size={80} />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
                            <Crown size={24} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Premium kliniker</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-rose-500">{stats.premium}</p>
                        <span className="text-gray-400 text-sm">aktiva</span>
                    </div>
                    <Link href="/admin/kliniker?query=premium" className="mt-6 flex items-center gap-2 text-sm text-rose-500 font-medium hover:gap-3 transition-all">
                        Hantera premium <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Verification Queue */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-blue-500">
                        <ShieldAlert size={80} />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                            <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Verifieringskö</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-bold text-blue-500">{stats.unverified}</p>
                        <span className="text-gray-400 text-sm">väntar</span>
                    </div>
                    <Link href="/admin/kliniker" className="mt-6 flex items-center gap-2 text-sm text-blue-500 font-medium hover:gap-3 transition-all">
                        Gå till kön <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Quick Actions or recent activity can go here later */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <PlusIcon className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Redo för mer?</h3>
                <p className="text-gray-500 max-w-sm">Här kommer du snart se den senaste aktiviteten och snabbkommandon för att hantera din plattform.</p>
            </div>
        </div>
    );
}

function PlusIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
