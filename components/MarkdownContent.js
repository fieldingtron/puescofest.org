// components/MarkdownContent.js
import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function MarkdownContent({ markdownText }) {
  return (
    <article className="prose prose-lg text-left  dark:prose-invert  px-3 mx-3">
      <TinaMarkdown content={markdownText} />
    </article>
  );
}
