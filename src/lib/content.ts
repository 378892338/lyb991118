import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ContentMeta, ContentItem, ContentType } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getAllContent<T = ContentMeta>(type: ContentType): T[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return {
      ...data,
      slug: file.replace(/\.md$/, ""),
    } as unknown as T;
  });

  return items
    .filter((item) => (item as ContentMeta).published !== false)
    .sort(
      (a, b) =>
        new Date((b as ContentMeta).date).getTime() -
        new Date((a as ContentMeta).date).getTime()
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
      meta: { ...data, slug } as unknown as T,
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
  const featured = all.filter((item) => (item as ContentMeta).featured);
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
