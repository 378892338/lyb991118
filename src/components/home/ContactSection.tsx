import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-neutral-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            一起探索AI的可能性
          </h2>
          <p className="mt-4 text-lg text-neutral-300 leading-relaxed max-w-xl mx-auto">
            无论你是企业管理者在寻找AI落地路径，
            <br />
            还是同行者希望交流经验，都欢迎联系。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              className="!bg-white !text-neutral-900 hover:!bg-neutral-100"
            >
              联系我
            </Button>
            <Button
              href="https://github.com/378892338"
              variant="secondary"
              className="!border-neutral-600 !text-neutral-300 hover:!border-neutral-500 hover:!text-white"
            >
              GitHub
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
