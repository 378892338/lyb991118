import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getContentIndex } from "@/lib/content";

interface Props {
  params: Promise<{ category: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = category.join("/");
  return {
    title: `${cat} — 知识库`,
  };
}

export default async function KnowledgeCategoryPage({ params }: Props) {
  const { category } = await params;
  const catPath = category.join("/");
  const index = getContentIndex();

  const entries = index.filter(
    (e) => e.category === catPath || e.subcategory === catPath
  );

  if (entries.length === 0) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-6"
        >
          ← 返回知识库
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          {catPath}
        </h1>
        <p className="text-sm text-neutral-400 mb-8">{entries.length} 篇</p>

        <div className="space-y-3">
          {entries.map((entry) => (
            <Link
              key={`${entry.type}-${entry.slug}`}
              href={`/${entry.type}s/${entry.slug}`}
              className="block p-4 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-neutral-100 uppercase">
                  {entry.type}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">{entry.title}</h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
