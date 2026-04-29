import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blogg - Artiklar om skönhet & behandlingar',
    description: 'Snart lanserar vi vår blogg med guider, tips och artiklar om skönhet, hudvård och estetiska behandlingar.',
    alternates: {
        canonical: '/blogg',
    },
};

export default function BlogLandingPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-8 pb-24 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Blogg</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Snart lanserar vi vår blogg med guider, tips och artiklar om skönhet, hudvård och estetiska behandlingar.
                </p>
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl inline-block">
                    <p className="text-rose-700 font-medium">Bokmärk sidan – Innehåll är på väg!</p>
                </div>
            </div>
        </main>
    );
}
