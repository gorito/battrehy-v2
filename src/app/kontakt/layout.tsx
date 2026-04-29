import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakta oss',
    description: 'Har du frågor om en klinik eller vill samarbeta? Kontakta oss på battrehy.se. Vi svarar oftast inom 24 timmar.',
    alternates: {
        canonical: 'https://battrehy.se/kontakt',
    },
};

export default function KontaktLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
