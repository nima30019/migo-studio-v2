import React from 'react';
import Link from 'next/link';

interface MessageContentProps {
  content: string;
}

/**
 * Lightweight and secure Markdown renderer for MIGO AI chat messages.
 * Handles bold text, bullet points, numbered lists, and internal Next.js links.
 */
export function MessageContent({ content }: MessageContentProps) {
  if (!content) return null;

  // Split text by lines
  const lines = content.split('\n');

  const renderFormattedText = (text: string) => {
    // Regex for markdown links: [text](url) and bold: **bold**
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Tokenize links and bold
    const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
    const splitParts = remaining.split(tokenRegex);

    for (const part of splitParts) {
      if (!part) continue;

      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (match) {
          const [, linkText, linkUrl] = match;
          parts.push(
            <Link
              key={`link-${keyIdx++}`}
              href={linkUrl}
              className="inline-flex items-center gap-1 font-semibold text-brand-orange hover:text-white underline underline-offset-4 decoration-brand-orange/40 hover:decoration-brand-orange transition-colors"
            >
              <span>{linkText}</span>
            </Link>
          );
          continue;
        }
      }

      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        const boldText = part.slice(2, -2);
        parts.push(
          <strong key={`bold-${keyIdx++}`} className="font-bold text-white">
            {boldText}
          </strong>
        );
        continue;
      }

      parts.push(<span key={`text-${keyIdx++}`}>{part}</span>);
    }

    return parts;
  };

  return (
    <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-neutral-200">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Bullet point
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 ps-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
              <div className="flex-1">{renderFormattedText(trimmed.slice(2))}</div>
            </div>
          );
        }

        // Numbered list (e.g. "1. " or "۱. ")
        const numberedMatch = trimmed.match(/^([0-9]+|[۰-۹]+)[\.\)]\s*(.*)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 ps-1">
              <span className="font-mono text-brand-orange font-bold text-xs shrink-0 mt-0.5">
                {numberedMatch[1]}.
              </span>
              <div className="flex-1">{renderFormattedText(numberedMatch[2])}</div>
            </div>
          );
        }

        // Regular paragraph
        return <p key={idx}>{renderFormattedText(line)}</p>;
      })}
    </div>
  );
}
