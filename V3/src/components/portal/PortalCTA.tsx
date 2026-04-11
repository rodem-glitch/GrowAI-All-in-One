"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function PortalCTA() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#242728] dark:bg-[#0a0b0c]">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white whitespace-pre-line">
          {"AI의 미래를\n지금 경험하세요"}
        </h2>
        <p className="text-lg text-gray-400 mt-4 whitespace-pre-line">
          {"교육 · 제조 · 영상 · 고객 서비스\nGrowAI 하나로 혁신을 시작하세요."}
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.primary }}
          >
            무료로 시작하기 →
          </a>
          <a
            href="#contact"
            className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            style={{ borderColor: colors.primary, color: colors.primary }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${colors.primary}1a`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
          >
            영업팀 문의
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          신용카드 없이 시작 · 14일 무료 체험 · 언제든 해지 가능
        </p>
      </div>
    </section>
  );
}
