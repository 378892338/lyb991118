import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { ArticleCard } from "@/components/content/ContentCards";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "关于AI、职业转型、制造业数字化的深度思考与实践分享。",
};

export default function ArticlesPage() {
  const articles = getAllContent("articles");

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
          Articles
        </h1>
        <p className="text-lg text-neutral-400 mb-12">
          关于AI、职业转型、制造业数字化的深度思考与实践分享
        </p>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <ArticleCard
                key={item.slug}
                item={item}
                href={`/articles/${item.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400">
            文章正在准备中，敬请期待...
          </div>
        )}
      </div>
    </div>
  );
}
