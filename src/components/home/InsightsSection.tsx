import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArticleCard } from "@/components/content/ContentCards";
import { getFeaturedContent } from "@/lib/content";
import Link from "next/link";

export default function InsightsSection() {
  const articles = getFeaturedContent("articles", 3);

  return (
    <section id="insights" className="py-24 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="AI Insights"
            subtitle="AI时代的观察与思考 — 技术、行业与个人成长"
          />
        </AnimatedSection>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item, i) => (
              <AnimatedSection key={item.slug} delay={i * 100}>
                <ArticleCard item={item} href={`/articles/${item.slug}`} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            文章正在准备中，敬请期待...
          </div>
        )}

        <AnimatedSection delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              查看全部文章 →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
