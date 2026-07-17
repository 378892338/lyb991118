// ── Base fields common to all content types ──
export interface BaseMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  minutesRead?: number;
  published?: boolean;
  featured?: boolean;
  coverImage?: string;

  // Knowledge base — multi-level taxonomy (optional until assigned)
  category?: string;
  subcategory?: string;
  series?: string;
  seriesOrder?: number;
  relatedSlugs?: string[];
  references?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";

  // Multi-modal extension
  contentType?: "article" | "video" | "audio" | "image";
  mediaUrl?: string;
  mediaDuration?: number;
}

// ── Per-type specialisation ──
export interface ArticleMeta extends BaseMeta {
  type: "article";
}

export interface ExperimentMeta extends BaseMeta {
  type: "experiment";
  status: "ongoing" | "completed" | "paused";
  techStack: string[];
  background?: string;
  problem?: string;
  approach?: string;
  result?: string;
  reflection?: string;
}

export interface CaseMeta extends BaseMeta {
  type: "case";
  client: string;
  industry: string;
}

// ── Discriminated union ──
export type ContentMeta = ArticleMeta | ExperimentMeta | CaseMeta;

export interface ContentItem<T = ContentMeta> {
  meta: T;
  content: string;
}

export type ContentType = "articles" | "experiments" | "cases";
