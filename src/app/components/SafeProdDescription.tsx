"use client";
import DOMPurify from "dompurify";

export default function SafeProdDescription({ html }: { html?: string }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html ?? ""),
      }}
    />
  );
}
