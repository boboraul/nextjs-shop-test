"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  html?: string;
  classes?: string;
}

export default function SafeHtml({ html, classes }: SafeHtmlProps) {
  const [cleanHtml, setCleanHtml] = useState("");
  console.log(html);

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
    <p className={classes} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  );
}
