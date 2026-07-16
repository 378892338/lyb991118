import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { CaseCard } from "@/components/content/ContentCards";

export const metadata: Metadata = {
  title: "Cases",
  description: "企业AI应用案例研究 — 从方案设计到实施效果的真实记录。",
};

export default function CasesPage() {
  const cases = getAllContent("cases");

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
          Enterprise Cases
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          企业AI应用案例研究 — 从方案设计到实施效果的真实记录
        </p>

        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item) => (
              <CaseCard
                key={item.slug}
                item={item}
                href={`/cases/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400">
            案例正在准备中，敬请期待...
          </div>
        )}
      </div>
    </div>
  );
}
