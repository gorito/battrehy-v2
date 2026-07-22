import { stripUndefined } from './utils';

export interface ArticleOptions {
    headline: string;
    description: string;
    authorName?: string;
    authorUrl?: string;
    datePublished: string;
    dateModified: string;
    imageUrl: string;
    pageUrl: string;
}

export function buildArticleSchema({
    headline,
    description,
    authorName = 'Battrehy.se',
    authorUrl = 'https://battrehy.se/om-redaktionen',
    datePublished,
    dateModified,
    imageUrl,
    pageUrl
}: ArticleOptions) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        author: {
            '@type': 'Organization',
            name: authorName,
            url: authorUrl
        },
        publisher: {
            '@type': 'Organization',
            name: 'Battrehy.se',
            url: 'https://battrehy.se'
        },
        datePublished,
        dateModified,
        inLanguage: 'sv-SE',
        image: imageUrl,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': pageUrl
        }
    };

    return stripUndefined(schema);
}
