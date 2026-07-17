"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KNOWLEDGE_BASE = "/knowledge";

export default function BackLink({ fallbackHref, fallbackLabel }: { fallbackHref: string; fallbackLabel: string }) {
  const [fromKnowledge, setFromKnowledge] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.referrer.includes(KNOWLEDGE_BASE)) {
      setFromKnowledge(true);
    }
  }, []);

  if (fromKnowledge) {
    return (
      <Link
        href="/knowledge"
        className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
      >
        ← 返回知识库
      </Link>
    );
  }

  return (
    <Link
      href={fallbackHref}
      className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
    >
      ← {fallbackLabel}
    </Link>
  );
}
