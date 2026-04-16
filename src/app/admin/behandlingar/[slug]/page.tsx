import { getTreatmentBySlug } from '@/lib/supabase/actions/queries';
import { updateTreatmentAction } from '@/lib/supabase/actions/mutations';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditTreatmentPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
    // Next.js 15+ safely awaits params, while falling back for older versions
    const resolvedParams = await params;
    const treatment = await getTreatmentBySlug(resolvedParams.slug);

    if (!treatment) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/behandlingar" className="text-gray-500 hover:text-primary">&larr; Tillbaka</Link>
                <h1 className="text-3xl font-bold text-gray-900">Redigera {treatment.name}</h1>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form action={updateTreatmentAction} className="space-y-6">
                    <input type="hidden" name="id" value={treatment.id} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Namn (Kan ej ändras)</label>
                        <input
                            type="text"
                            readOnly
                            value={treatment.name}
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 text-gray-600 focus:outline-none cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Behandlingsnamnet och sluggen är låsta för att inte bryta SEO-historik.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bild URL</label>
                        <input
                            name="image_url"
                            type="url"
                            defaultValue={treatment.image_url || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/..."
                        />
                        {treatment.image_url && (
                            <div className="mt-3">
                                <p className="text-xs text-gray-500 mb-1">Nuvarande bild:</p>
                                <div
                                    className="w-48 h-32 rounded-lg bg-cover bg-center border border-gray-200"
                                    style={{ backgroundImage: `url(${treatment.image_url})` }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Behandlingsbeskrivning (Rollover-text)</label>
                        <textarea
                            name="description"
                            rows={5}
                            defaultValue={treatment.description || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder={`Skriv en säljande och informativ SEO-text om ${treatment.name.toLowerCase()}...`}
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">Denna text visas när besökare hovrar över behandlingens bild på startsidan, samt högst upp på behandlingens egen undersida.</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold transition-colors"
                        >
                            Spara ändringar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
