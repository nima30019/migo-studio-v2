import React from 'react';

interface StructuredDataProps {
  id?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function StructuredData({ id, data }: StructuredDataProps) {
  // Sanitize JSON-LD payload to eliminate any potential XSS injection
  const jsonString = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
