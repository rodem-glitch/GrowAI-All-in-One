"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

function Counter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.3);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 9,
    suffix: "+",
    label: "AI Solutions",
    description: "통합 AI 솔루션",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Active Users",
    description: "글로벌 활성 사용자",
  },
  {
    value: 200,
    suffix: "+",
    label: "Enterprise Clients",
    description: "엔터프라이즈 고객사",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime SLA",
    description: "서비스 안정성",
    decimals: 1,
  },
  {
    value: 15,
    suffix: "B+",
    label: "API Calls / Month",
    description: "월간 API 호출",
  },
  {
    value: 42,
    suffix: "",
    label: "Countries",
    description: "서비스 제공 국가",
  },
];

export default function PortalStats() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0f1a] to-[#06060a]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-emerald-400 mb-4">
            By the Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Trusted at Scale
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-sm font-medium text-gray-400 mt-2">
                {stat.label}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
