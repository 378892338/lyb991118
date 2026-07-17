import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ExperimentMeta } from "@/types/content";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs("experiments").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug<ExperimentMeta>("experiments", slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.summary,
  };
}

export default async function ExperimentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug<ExperimentMeta>("experiments", slug);

  if (!item) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/experiments"
          className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
        >
          ← 返回实验列表
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            {item.meta.status && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.meta.status === "completed"
                    ? "bg-brand-50 text-brand-600 border border-brand-200"
                    : item.meta.status === "ongoing"
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "bg-neutral-50 text-neutral-500 border border-neutral-200"
                }`}
              >
                {item.meta.status === "completed"
                  ? "已完成"
                  : item.meta.status === "ongoing"
                    ? "进行中"
                    : "已归档"}
              </span>
            )}
            <time className="text-sm text-neutral-400">
              {formatDate(item.meta.date)}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            {item.meta.title}
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">
            {item.meta.summary}
          </p>

          {item.meta.techStack && (
            <div className="flex flex-wrap gap-2 mt-4">
              {item.meta.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-neutral-900 text-neutral-50"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="border-t border-neutral-100 pt-8">
          <MarkdownRenderer content={item.content} />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-neutral-100">
          <Link
            href="/experiments"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            ← 返回实验列表
          </Link>
        </div>
      </article>
    </div>
  );
}
