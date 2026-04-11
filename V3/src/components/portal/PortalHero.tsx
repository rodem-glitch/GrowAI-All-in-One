"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function PortalHero() {
  const { colors } = useTheme();

  return (
    <section className="w-full text-center pt-32 pb-20 px-4 dark:bg-[#0f1112]">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
          style={{ borderColor: `${colors.primary}40`, backgroundColor: `${colors.primary}0d` }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.primary }}
          />
          <span className="text-sm font-medium text-[#555c5d] dark:text-gray-400">
            Global No.1 AI Platform Powered by NEWKLE Inc.
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-[88px] font-bold text-[#242727] dark:text-white leading-tight">
          The Future of AI,
          <br />
          <span style={{ color: colors.primary }}>All in One Platform</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#555c5d] dark:text-gray-400 mt-6 max-w-3xl mx-auto whitespace-pre-line">
          {"LMS · Manufacturing · Video · Customer Care\n9개 AI 솔루션을 하나의 플랫폼에서.\nOne Platform, Infinite Possibilities."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
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

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: 9, suffix: "+", label: "AI Solutions" },
            { value: 50000, suffix: "+", label: "Active Users" },
            { value: 200, suffix: "+", label: "Enterprise Clients" },
            { value: 99, suffix: ".9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-[#242727] dark:text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-[#555c5d] dark:text-gray-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Visual Placeholder */}
        <div
          className="mt-16 rounded-2xl h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${colors.primary}33, ${colors.primaryDark}1a)`,
          }}
        >
          <button
            aria-label="Play video"
            className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/60 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-white/80 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 translate-x-0.5" style={{ color: colors.primary }}>
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
