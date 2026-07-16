import type { ContentMeta } from "@/types/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface ContentCardProps {
  item: ContentMeta;
  href: string;
  type?: "article" | "experiment" | "case";
}

export function ArticleCard({ item, href }: { item: ContentMeta; href: string }) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
        <time>{formatDate(item.date)}</time>
        {item.minutesRead && (
          <>
            <span>·</span>
            <span>{item.minutesRead} 分钟阅读</span>
          </>
        )}
      </div>
      <h3 className="text-base font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-500 line-clamp-2">{item.summary}</p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-50 text-neutral-500 border border-neutral-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function ExperimentCard({ item, href }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        {item.status && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              item.status === "completed"
                ? "bg-brand-50 text-brand-600 border border-brand-200"
                : item.status === "ongoing"
                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                  : "bg-neutral-50 text-neutral-500 border border-neutral-200"
            }`}
          >
            {item.status === "completed" ? "已完成" : item.status === "ongoing" ? "进行中" : "已归档"}
          </span>
        )}
        <time className="text-xs text-neutral-400">{formatDate(item.date)}</time>
      </div>
      <h3 className="text-base font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-500 line-clamp-2">{item.summary}</p>
      {item.techStack && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(item.techStack as string[]).slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-50"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function CaseCard({ item, href }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-xl border border-neutral-100 bg-white hover:border-neutral-200 hover:shadow-sm transition-all"
    >
      {item.client && (
        <p className="text-xs text-brand-600 font-medium mb-2">{item.client}</p>
      )}
      <h3 className="text-base font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-neutral-500 line-clamp-2">{item.summary}</p>
      {item.industry && (
        <span className="inline-block mt-3 text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200">
          {item.industry}
        </span>
      )}
    </Link>
  );
}
