"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

interface SearchIndexEntry {
  slug: string;
  title: string;
  type: string;
  date: string;
  tags: string[];
  summary: string;
  bodyPreview: string;
  category?: string;
  subcategory?: string;
}

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadIndex = async () => {
      try {
        const res = await fetch("/search-index.json");
        if (res.ok) {
          const data = await res.json();
          setIndex(data);
        }
      } catch (e) {
        console.error("Search index load failed:", e);
      } finally {
        setLoading(false);
      }
    };
    loadIndex();
  }, []);

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Simple fuzzy search (no external deps)
  const search = (q: string): SearchIndexEntry[] => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return index
      .filter((entry) => {
        const haystack = [
          entry.title,
          entry.summary,
          entry.bodyPreview,
          ...entry.tags,
          entry.category || "",
          entry.subcategory || "",
        ].join(" ").toLowerCase();

        // Simple fuzzy: all query chars appear in order
        let idx = 0;
        for (const ch of lower) {
          idx = haystack.indexOf(ch, idx);
          if (idx === -1) return false;
          idx++;
        }
        return true;
      })
      .slice(0, 10);
  };

  useEffect(() => {
    setResults(search(query));
  }, [query, index]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden border border-neutral-100">
        <div className="flex items-center gap-3 p-4 border-b border-neutral-100">
          <Search className="text-neutral-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章、实验、案例... (⌘K)"
            className="flex-1 bg-transparent text-lg text-neutral-900 placeholder-neutral-400 outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-neutral-400 hover:text-neutral-600"
              aria-label="Clear"
            >
              <X size={20} />
            </button>
          )}
          <kbd className="px-2 py-1 text-xs text-neutral-400 bg-neutral-100 rounded">
            ⌘K
          </kbd>
        </div>

        {loading ? (
          <div className="p-8 text-center text-neutral-400">加载索引中...</div>
        ) : results.length > 0 ? (
          <ul className="max-h-96 overflow-y-auto divide-y divide-neutral-100">
            {results.map((entry) => (
              <li key={`${entry.type}-${entry.slug}`}>
                <Link
                  href={`/${entry.type}s/${entry.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 uppercase">
                      {entry.type}
                    </span>
                    {entry.category && <span>{entry.category}</span>}
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900">{entry.title}</h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{entry.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : query ? (
          <div className="p-8 text-center text-neutral-400">没有找到匹配结果</div>
        ) : (
          <div className="p-8 text-center text-neutral-400">
            输入关键词搜索，或按 <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded">⌘K</kbd> 关闭
          </div>
        )}
      </div>
    </div>
  );
}