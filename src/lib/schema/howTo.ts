import { stripUndefined } from "./utils";

export interface HowToStep {
    name: string;
    text: string;
    url?: string;
    imageUrl?: string;
}

export interface HowToOptions {
    name: string;
    description: string;
    totalTime?: string;
    steps: HowToStep[];
}

export function buildHowToSchema({
    name,
    description,
    totalTime,
    steps
}: HowToOptions) {
    if (!steps || steps.length === 0) return undefined;

    const schema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        totalTime,
        step: steps.map((s, idx) => ({
            "@type": "HowToStep",
            position: idx + 1,
            name: s.name,
            text: s.text,
            url: s.url,
            image: s.imageUrl
        }))
    };

    return stripUndefined(schema);
}
