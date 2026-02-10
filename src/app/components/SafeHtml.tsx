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
      setCleanHtml(
        DOMPurify.sanitize(html, {
          FORBID_TAGS: ["p"],
        }),
      );
    }
  }, [html]);

  return (
    <div
      className="short-description inline-block text-sm h-6 text-gray-500 whitespace-nowrap w-[100%] overflow-hidden text-ellipsis"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
