import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CaseCard } from "@/components/content/ContentCards";
import { getFeaturedContent } from "@/lib/content";
import Link from "next/link";

import type { CaseMeta } from "@/types/content";

export default function CasesSection() {
  const cases = getFeaturedContent<CaseMeta>("cases", 3);

  return (
    <section id="cases" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Enterprise Cases"
            subtitle="AI在企业中的真实落地案例 — 从方案到效果"
          />
        </AnimatedSection>

        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item, i) => (
              <AnimatedSection key={item.slug} delay={i * 100}>
                <CaseCard item={item} href={`/cases/${item.slug}`} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            案例正在准备中，敬请期待...
          </div>
        )}

        <AnimatedSection delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              查看全部案例 →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
