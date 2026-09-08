import { FAQItem, buildFAQSchema } from "@/lib/schema/faq";

export interface FAQPageSchemaProps {
    questions: FAQItem[];
}

/**
 * Reusable FAQPage Schema component.
 * Server-side renders raw JSON-LD structured data (<script type="application/ld+json">)
 * so it is immediately visible in the page source without JavaScript execution.
 */
export function FAQPageSchema({ questions }: FAQPageSchemaProps) {
    if (!questions || questions.length === 0) return null;

    const schema = buildFAQSchema(questions);
    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default FAQPageSchema;
