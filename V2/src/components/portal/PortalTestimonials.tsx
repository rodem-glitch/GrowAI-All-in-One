"use client";

import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "LearnForm 도입 후 이러닝 콘텐츠 제작 시간이 80% 단축되었습니다. CREATOR 프레임워크의 체계적인 접근이 핵심이었습니다.",
    name: "교육혁신팀",
    role: "kopo.ac.kr",
    avatar: "ED",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    quote: "MAP 솔루션으로 제조 공정 불량률을 40% 줄였습니다. AI 품질 예측이 실시간으로 작동하여 즉각 대응이 가능해졌습니다.",
    name: "스마트팩토리팀",
    role: "daekwangent.co.kr",
    avatar: "MF",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    quote: "VAS 영상 자동 요약으로 수천 시간의 강의 영상을 효율적으로 관리하고 있습니다. 현장 교육 만족도가 크게 향상되었습니다.",
    name: "현장교육센터",
    role: "dajimcon.co.kr",
    avatar: "VD",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    quote: "CCB 챗봇 도입 후 문의 응답 시간이 평균 3분에서 15초로 단축되었습니다. 다국어 지원으로 글로벌 서비스 품질도 향상되었습니다.",
    name: "AI혁신위원회",
    role: "smiba.kr",
    avatar: "AI",
    gradient: "from-pink-500 to-rose-400",
  },
];

export default function PortalTestimonials() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#08080e]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-amber-400 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            대학, 기업, 공공기관의 리더들이 GrowAI를 신뢰합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-700 hover:-translate-y-1 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg
                    key={si}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 leading-relaxed mb-6 text-[15px]">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                >
                  <span className="text-white font-semibold text-xs">
                    {item.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
