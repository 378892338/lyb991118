import Button from "@/components/ui/Button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const STARS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${4 + Math.random() * 92}%`,
  top: `${3 + Math.random() * 30}%`,
  size: 1 + (Math.random() > 0.7 ? 1 : 0),
  delay: `${Math.random() * 5}s`,
  duration: `${4 + Math.random() * 4}s`,
}));

const CLOUDS = [
  { left: "5%",  top: "20%", width: "240px", delay: "0s",  duration: "30s" },
  { left: "55%", top: "16%", width: "300px", delay: "8s",  duration: "34s" },
  { left: "25%", top: "32%", width: "200px", delay: "14s", duration: "28s" },
  { left: "70%", top: "28%", width: "260px", delay: "4s",  duration: "32s" },
  { left: "12%", top: "44%", width: "280px", delay: "10s", duration: "26s" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden dawn-sky-bg"
    >
      {/* 星星 */}
      {STARS.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      {/* 月亮 */}
      <svg
        className="dawn-moon"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="42" fill="#f5e9d0" opacity="0.92" />
        <circle cx="48" cy="50" r="5" fill="#e8d6a3" opacity="0.35" />
        <circle cx="68" cy="56" r="4" fill="#e8d6a3" opacity="0.28" />
        <circle cx="56" cy="72" r="7" fill="#e8d6a3" opacity="0.22" />
      </svg>

      {/* 淡云 — 缓慢漂浮 */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="dawn-cloud"
          style={{
            left: c.left,
            top: c.top,
            width: c.width,
            animationDelay: c.delay,
            animationDuration: c.duration,
          }}
        />
      ))}

      {/* 主标题 */}
      <div className="max-w-3xl mx-auto text-center pt-16 relative z-10">
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
