/**
 * Converts a string to an ASCII slug, handling Swedish characters specifically.
 */
export function slugifyCity(name: string): string {
    return name
        .toLowerCase()
        .replace(/[åä]/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
