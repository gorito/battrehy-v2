export function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [
        k,
        typeof v === 'object' && !Array.isArray(v) && v !== null
          ? stripUndefined(v as Record<string, unknown>)
          : v,
      ])
  );
}
