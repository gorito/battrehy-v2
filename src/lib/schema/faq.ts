import { stripUndefined } from './utils';

export interface FAQItem {
    question: string;
    answer: string;
}

export function buildFAQSchema(questions: FAQItem[]) {
    if (!questions || questions.length === 0) return undefined;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer
            }
        }))
    };

    return stripUndefined(schema);
}
