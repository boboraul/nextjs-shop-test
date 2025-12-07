"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  html?: string;
}

export default function SafeHtml({ html }: SafeHtmlProps) {
  const [cleanHtml, setCleanHtml] = useState("");

  useEffect(() => {
    if (html) {
      setCleanHtml(DOMPurify.sanitize(html));
    }
  }, [html]);

  return (
    <div
      className="text-sm h-4 text-gray-500 mt-2"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
