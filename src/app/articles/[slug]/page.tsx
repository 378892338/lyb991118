import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ArticleMeta } from "@/types/content";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs("articles").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug<ArticleMeta>("articles", slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.summary,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug<ArticleMeta>("articles", slug);

  if (!item) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
        >
          ← 返回文章列表
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <time>{formatDate(item.meta.date)}</time>
            {item.meta.minutesRead && (
              <>
                <span>·</span>
                <span>{item.meta.minutesRead} 分钟阅读</span>
              </>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            {item.meta.title}
          </h1>
          <p className="text-lg text-neutral-500">{item.meta.summary}</p>
        </header>

        <div className="border-t border-neutral-100 pt-8">
          <MarkdownRenderer content={item.content} />
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-100">
          <Link
            href="/articles"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            ← 返回文章列表
          </Link>
        </div>
      </article>
    </div>
  );
}
