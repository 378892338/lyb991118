import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ExperimentCard } from "@/components/content/ContentCards";
import { getFeaturedContent } from "@/lib/content";
import Link from "next/link";

export default function ExperimentsSection() {
  const experiments = getFeaturedContent("experiments", 3);

  return (
    <section id="experiments" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Experiments"
            subtitle="真实的AI实验记录 — 从想法到验证的完整过程"
          />
        </AnimatedSection>

        {experiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((item, i) => (
              <AnimatedSection key={item.slug} delay={i * 100}>
                <ExperimentCard
                  item={item}
                  href={`/experiments/${item.slug}`}
                />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            实验内容正在准备中，敬请期待...
          </div>
        )}

        <AnimatedSection delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/experiments"
              className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              查看全部实验 →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
