"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { PORTAL_SCENES } from "@/data/scripts/video-scenes";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function PortalHero() {
  const { colors } = useTheme();

  return (
    <section className="w-full">
      {/* Badge + Heading (위) */}
      <div className="text-center pt-32 pb-10 px-4 dark:bg-[#0f1112]">
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{ borderColor: `${colors.primary}40`, backgroundColor: `${colors.primary}0d` }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }} />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              당신의 비즈니스가 AI를 만나는 가장 빠른 방법
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[80px] font-bold text-gray-900 dark:text-white leading-tight">
            AI의 미래,
            <br />
            <span style={{ color: colors.primary }}>여기서 시작됩니다.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mt-6 max-w-3xl mx-auto whitespace-pre-line">
            {"교육, 제조, 영상, 고객 서비스.\n9개의 AI 솔루션이 하나의 플랫폼 위에서 움직입니다.\n가능성에 끝은 없습니다."}
          </p>

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <a
              href="#services"
              className="px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              Explore Solutions →
            </a>
            <a
              href="#demo"
              className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: colors.primary, color: colors.primary }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${colors.primary}1a`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            >
              ▶ Watch Demo
            </a>
          </div>
        </div>
      </div>

      {/* ── 씨네마틱 비디오 영역 ── */}
      <div id="demo">
        <VideoPlayer
          scenes={PORTAL_SCENES}
          sceneDuration={4000}
        />
      </div>

      {/* Stats */}
      <div className="py-12 px-4 dark:bg-[#0f1112]">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: 9, suffix: "+", label: "AI Solutions" },
            { value: 50000, suffix: "+", label: "Active Users" },
            { value: 200, suffix: "+", label: "Enterprise Clients" },
            { value: 99, suffix: ".9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
