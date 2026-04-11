"use client";

import { useInView } from "@/hooks/useInView";
import {
  GraduationCap,
  Factory,
  Building2,
  Stethoscope,
} from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    industry: "교육 · Education",
    title: "AI 기반 이러닝 혁신",
    items: [
      "CREATOR 7단계 교수설계 자동화",
      "FKDS 순환 학습 모델 적용",
      "멀티 AI 콘텐츠 자동 생성",
      "LMS 원클릭 연동",
    ],
    gradient: "from-blue-500 to-cyan-400",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Factory,
    industry: "제조 · Manufacturing",
    title: "제조 AI",
    items: [
      "실시간 품질 예측 및 불량 감지",
      "공정 최적화 AI 엔진",
      "예지보전 (Predictive Maintenance)",
      "디지털 트윈 연동",
    ],
    gradient: "from-emerald-500 to-teal-400",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Building2,
    industry: "건설 · Construction",
    title: "AI 건설 현장 관리",
    items: [
      "IoT 센서 실시간 모니터링",
      "안전 사고 예측 AI",
      "공정 관리 자동화",
      "BIM 데이터 통합",
    ],
    gradient: "from-amber-500 to-orange-400",
    borderColor: "border-amber-500/20",
  },
  {
    icon: Stethoscope,
    industry: "헬스케어 · Healthcare",
    title: "AI 의료 교육",
    items: [
      "AI 의료 시뮬레이션",
      "임상 사례 자동 생성",
      "다국어 의학 용어 번역",
      "HIPAA 준수 보안",
    ],
    gradient: "from-violet-500 to-purple-400",
    borderColor: "border-violet-500/20",
  },
];

export default function PortalUseCases() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#06060a]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-orange-400 mb-4">
            Use Cases
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Industry Solutions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto whitespace-pre-line">
            {"산업마다 현장이 다르기에, AI도 달라야 합니다.\n교육 · 제조 · 건설 · 헬스케어 각 분야에 최적화된 솔루션"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.industry}
                className={`group rounded-2xl border ${uc.borderColor} bg-white/[0.02] p-8 hover:-translate-y-1 transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${uc.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className="w-7 h-7 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <span
                      className={`text-xs font-semibold tracking-wider uppercase bg-gradient-to-r ${uc.gradient} bg-clip-text text-transparent`}
                    >
                      {uc.industry}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-4">
                      {uc.title}
                    </h3>
                    <ul className="space-y-2">
                      {uc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <svg
                            className="w-4 h-4 text-gray-600 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
