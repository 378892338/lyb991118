export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage?: string;
  featured?: boolean;
  published?: boolean;
  minutesRead?: number;
  status?: string;
  techStack?: string[];
  client?: string;
  industry?: string;
}

export interface ContentItem<T = ContentMeta> {
  meta: T;
  content: string;
}

export type ContentType = "articles" | "experiments" | "cases";
