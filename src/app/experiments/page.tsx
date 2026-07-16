import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ExperimentCard } from "@/components/content/ContentCards";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "真实的AI实验记录 — 从想法到验证的完整过程，包括工具、方案与反思。",
};

export default function ExperimentsPage() {
  const experiments = getAllContent("experiments");

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
          Experiments
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          真实的AI实验记录 — 从想法到验证的完整过程
        </p>

        {experiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((item) => (
              <ExperimentCard
                key={item.slug}
                item={item}
                href={`/experiments/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400">
            实验内容正在准备中，敬请期待...
          </div>
        )}
      </div>
    </div>
  );
}
