/**
 * Converts a string to an ASCII slug, handling Swedish characters specifically.
 */
export function slugifyCity(name: string | null | undefined): string {
    if (!name || typeof name !== 'string') return '';
    return name
        .toLowerCase()
        .replace(/[åä]/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
