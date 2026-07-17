import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ContentMeta, ContentItem, ContentType } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ── Helpers ──

function injectType<T>(
  data: Record<string, unknown>,
  type: ContentType
): T {
  return { ...data, type: type.replace(/s$/, "") } as unknown as T;
}

// ── Core API ──

export function getAllContent<T = ContentMeta>(type: ContentType): T[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return injectType<T>(data, type);
  });

  return items
    .filter((item) => (item as unknown as ContentMeta).published !== false)
    .sort(
      (a, b) =>
        new Date((b as unknown as ContentMeta).date).getTime() -
        new Date((a as unknown as ContentMeta).date).getTime()
    );
}

export function getContentBySlug<T = ContentMeta>(
  type: ContentType,
  slug: string
): ContentItem<T> | null {
  try {
    const filePath = path.join(CONTENT_DIR, type, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      meta: injectType<T>({ ...data, slug }, type),
      content,
    };
  } catch {
    return null;
  }
}

export function getFeaturedContent<T = ContentMeta>(
  type: ContentType,
  limit?: number
): T[] {
  const all = getAllContent<T>(type);
  const featured = all.filter(
    (item) => (item as unknown as ContentMeta).featured
  );
  const result = featured.length > 0 ? featured : all;
  return limit ? result.slice(0, limit) : result;
}

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ── Content index (React-cached, for server components / SSG) ──

export interface ContentIndexEntry {
  slug: string;
  title: string;
  type: string;
  date: string;
  tags: string[];
  summary: string;
  category?: string;
  subcategory?: string;
  contentType?: string;
}

export const getContentIndex = cache((): ContentIndexEntry[] => {
  const types: ContentType[] = ["articles", "experiments", "cases"];
  return types.flatMap((t) =>
    getAllContent(t).map((item) => {
      const m = item as unknown as ContentMeta;
      return {
        slug: m.slug,
        title: m.title,
        type: m.type,
        date: m.date,
        tags: m.tags || [],
        summary: m.summary,
        category: m.category,
        subcategory: m.subcategory,
        contentType: m.contentType,
      };
    })
  );
});

export function getAllCategories(): string[] {
  const index = getContentIndex();
  const cats = new Set(index.map((e) => e.category).filter(Boolean) as string[]);
  return [...cats].sort();
}

export function getAllTags(): string[] {
  const index = getContentIndex();
  const tags = new Set(index.flatMap((e) => e.tags));
  return [...tags].sort();
}
