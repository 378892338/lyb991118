import type { Metadata } from "next";
import Link from "next/link";
import { getContentIndex, getAllCategories, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "知识库",
  description: "Second Curve Lab 知识库 — AI、财务、制造业数字化",
};

export default function KnowledgePage() {
  const index = getContentIndex();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
          Knowledge Base
        </h1>
        <p className="text-lg text-neutral-400 mb-8">知识库</p>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/knowledge/${encodeURIComponent(cat)}`}
                  className="p-4 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-neutral-900">{cat}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recent entries */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">最近更新</h2>
          {index.length > 0 ? (
            <div className="space-y-3">
              {index.slice(0, 10).map((entry) => (
                <Link
                  key={`${entry.type}-${entry.slug}`}
                  href={`/${entry.type}s/${entry.slug}`}
                  className="block p-4 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-neutral-400">
              知识库内容正在准备中，敬请期待...
            </div>
          )}
        </section>

        {/* Tags */}
        {tags.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">标签</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/knowledge/tags/${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-neutral-50 text-neutral-600 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-100 transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
