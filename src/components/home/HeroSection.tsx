import Button from "@/components/ui/Button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-3xl mx-auto text-center pt-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05]">
          Second Curve Lab
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-neutral-500 leading-relaxed">
          AI时代的人生第二曲线实验
        </p>
        <p className="mt-3 text-base sm:text-lg text-neutral-400 max-w-xl mx-auto">
          一个20年制造业财务人的AI重构实践
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/experiments">Explore Experiments</Button>
          <Button href="/contact" variant="secondary">
            Contact Me
          </Button>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
