import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "20年制造业财务人，AI时代的实践者。Second Curve Lab 创始人，企业AI顾问。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-8">
          About
        </h1>

        <div className="space-y-6 text-neutral-600 leading-relaxed">
          <p className="text-lg text-neutral-700">
            拥有20年制造业财务经验，在AI时代重新构建职业价值。
          </p>
          <p>
            从一个传统行业的财务管理者，到AI应用的实践者，这条转型路径本身就是一场实验。
            Second Curve Lab 记录了这个过程中的思考、实践与成果。
          </p>
          <p>
            <strong className="text-neutral-900">企业AI顾问服务</strong>
            <br />
            基于20年真实企业经验，为企业提供AI转型咨询、AI应用方案设计、
            以及AI工具在企业场景中的落地指导。
          </p>
          <p>
            <strong className="text-neutral-900">核心能力</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "AI应用实践",
              "LLM / RAG",
              "企业AI转型",
              "制造业数字化",
              "数据分析",
              "财务分析",
            ].map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
