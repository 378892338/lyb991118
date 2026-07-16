import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedSection from "@/components/ui/AnimatedSection";

const milestones = [
  {
    year: "200x — 202x",
    title: "制造业财务管理",
    description: "20年深耕制造业财务领域，积累真实企业经验与业务理解深度。",
  },
  {
    year: "2023",
    title: "AI 探索起点",
    description: "接触大语言模型，开始将AI工具应用于日常工作效率提升。",
  },
  {
    year: "2024",
    title: "实验室成立",
    description: "创立 Second Curve Lab，系统化记录AI实验与企业实践。",
  },
  {
    year: "2025 — 现在",
    title: "企业AI顾问",
    description: "将20年行业经验与AI能力结合，为企业提供AI转型实践建议。",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="py-24 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            title="Journey"
            subtitle="从制造业财务到AI实践者 — 一条不断进化的第二曲线"
          />
        </AnimatedSection>

        <div className="relative">
          {/* 竖线 */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-200 hidden sm:block" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="relative pl-0 sm:pl-16">
                  {/* 圆点 */}
                  <div className="absolute left-4.5 sm:left-5.5 top-1 w-3 h-3 rounded-full bg-brand-500 border-2 border-white hidden sm:block" />

                  <div className="p-6 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all">
                    <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
