"use client";

import { useInView } from "@/hooks/useInView";

export default function PortalCTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-600" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto text-center" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight whitespace-pre-line">
            {"AI의 미래를\n지금 경험하세요"}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 whitespace-pre-line">
            {"교육 · 제조 · 영상 · 고객 서비스\nGrowAI 하나로 혁신을 시작하세요."}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              무료로 시작하기
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              영업팀 문의
            </a>
          </div>

          <p className="mt-6 text-sm text-white/50">
            신용카드 없이 시작 · 14일 무료 체험 · 언제든 해지 가능
          </p>
        </div>
      </div>
    </section>
  );
}
