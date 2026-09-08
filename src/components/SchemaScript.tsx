interface SchemaScriptProps {
  schemas: (object | undefined | null) | (object | undefined | null)[];
}

export function SchemaScript({ schemas }: SchemaScriptProps) {
  const rawArray = Array.isArray(schemas) ? schemas : [schemas];
  const schemaArray = rawArray.filter((s): s is object => Boolean(s));

  return (
    <>
      {schemaArray.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
