import Script from 'next/script';

interface SchemaScriptProps {
  schemas: object | object[];
}

export function SchemaScript({ schemas }: SchemaScriptProps) {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {schemaArray.map((schema, i) => (
        <Script
          key={i}
          id={`schema-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
