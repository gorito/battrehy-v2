// src/lib/cityFixes.ts
// Mapping of clinic names to corrected city names.
// Add entries here to override incorrect city data.
export const CITY_FIXES: Record<string, string> = {
  // Example entry:
  // 'Forma Vita Dalarna': 'Falun',
  'Forma Vita Dalarna': 'Falun',
};

/**
 * Returns the corrected city for a given clinic name if a mapping exists.
 * Falls back to the original city otherwise.
 */
export function getCorrectedCity(clinicName: string, originalCity: string): string {
  if (!clinicName) return originalCity;
  const normalized = clinicName.trim().toLowerCase();
  for (const [name, corrected] of Object.entries(CITY_FIXES)) {
    if (name.trim().toLowerCase() === normalized) {
      return corrected;
    }
  }
  return originalCity;
}
