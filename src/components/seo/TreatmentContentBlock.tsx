import { HelpCircle, AlertTriangle, ShieldCheck, DollarSign } from 'lucide-react';

interface FAQ {
    q: string;
    a: string;
}

interface TreatmentContent {
    intro?: string;
    things_to_consider?: {
        title?: string;
        points?: string[];
    };
    price_range?: string;
    faqs?: FAQ[];
}

interface Props {
    content?: string | TreatmentContent | null;
}

export default function TreatmentContentBlock({ content }: Props) {
    if (!content) return null;

    let parsed: TreatmentContent = {};
    
    try {
        if (typeof content === 'string') {
            parsed = JSON.parse(content);
        } else if (typeof content === 'object') {
            parsed = content;
        }
    } catch (e) {
        console.error("Error parsing treatment_content:", e);
        // Fallback: If it's a simple string, treat it as the introduction paragraph
        if (typeof content === 'string') {
            parsed = { intro: content };
        }
    }

    const { intro, things_to_consider, price_range, faqs } = parsed;

    const hasIntro = !!intro;
    const hasConsider = !!(things_to_consider?.points && things_to_consider.points.length > 0);
    const hasPrice = !!price_range;
    const hasFaqs = !!(faqs && faqs.length > 0);

    if (!hasIntro && !hasConsider && !hasPrice && !hasFaqs) return null;

    return (
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm mt-12 space-y-10">
            {/* Intro */}
            {hasIntro && (
                <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                        {intro}
                    </p>
                </div>
            )}

            {/* Things to Consider & Price Range grid */}
            {(hasConsider || hasPrice) && (
                <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                    {/* Things to Consider */}
                    {hasConsider && (
                        <div className="bg-[#fffafa] rounded-2xl p-6 border border-rose-100/50">
                            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="text-rose-500 shrink-0" size={22} />
                                {things_to_consider?.title || 'Vad du bör tänka på'}
                            </h3>
                            <ul className="space-y-3">
                                {things_to_consider.points?.map((point, idx) => (
                                    <li key={idx} className="flex gap-2.5 items-start text-gray-700 text-sm sm:text-base leading-relaxed">
                                        <span className="text-rose-500 font-bold select-none">•</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Price Range */}
                    {hasPrice && (
                        <div className="bg-[#fafaff] rounded-2xl p-6 border border-blue-100/50 flex flex-col justify-center">
                            <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                                <DollarSign className="text-blue-500 shrink-0" size={22} />
                                Pris i Sverige
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                                Priset för denna behandling kan variera beroende på klinik, omfattning och geografiskt läge.
                            </p>
                            <div className="text-2xl font-black text-blue-600 bg-blue-50/50 py-2.5 px-4 rounded-xl border border-blue-100 inline-block w-fit">
                                {price_range}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* FAQs */}
            {hasFaqs && (
                <div className="pt-8 border-t border-gray-50">
                    <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2">
                        <HelpCircle className="text-[#e8234a]" size={24} />
                        Vanliga frågor och svar
                    </h3>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 text-base mb-2 flex gap-2">
                                    <span className="text-rose-500">Q:</span>
                                    <span>{faq.q}</span>
                                </h4>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-6">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
