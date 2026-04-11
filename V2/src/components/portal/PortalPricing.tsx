"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    desc: "소규모 팀을 위한 기본 플랜",
    monthlyPrice: "₩490,000",
    annualPrice: "₩390,000",
    features: [
      "AI 솔루션 2개 선택",
      "월 10,000 API 호출",
      "5GB 스토리지",
      "이메일 지원",
      "기본 분석 대시보드",
    ],
    gradient: "",
    featured: false,
  },
  {
    name: "Professional",
    desc: "성장하는 조직을 위한 추천 플랜",
    monthlyPrice: "₩1,490,000",
    annualPrice: "₩1,190,000",
    features: [
      "AI 솔루션 5개 선택",
      "월 100,000 API 호출",
      "50GB 스토리지",
      "우선 지원 (24h SLA)",
      "고급 분석 대시보드",
      "팀 협업 (10명)",
      "커스텀 브랜딩",
    ],
    gradient: "from-blue-600 to-cyan-500",
    featured: true,
  },
  {
    name: "Enterprise",
    desc: "대규모 조직을 위한 맞춤 솔루션",
    monthlyPrice: "문의",
    annualPrice: "문의",
    features: [
      "전체 9개 AI 솔루션",
      "무제한 API 호출",
      "무제한 스토리지",
      "전담 매니저 배정",
      "커스텀 AI 모델 학습",
      "온프레미스 배포 옵션",
      "SLA 99.99% 보장",
      "보안 감사 리포트",
    ],
    gradient: "",
    featured: false,
  },
];

export default function PortalPricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#06060a]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            조직 규모에 맞는 플랜을 선택하세요
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-medium ${
              !isAnnual ? "text-white" : "text-gray-500"
            }`}
          >
            월간
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10 transition-colors"
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg transition-all duration-300 ${
                isAnnual ? "left-7" : "left-0.5"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isAnnual ? "text-white" : "text-gray-500"
            }`}
          >
            연간
          </span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
            20% 할인
          </span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-700 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-gradient-to-b from-blue-600/20 to-transparent border-2 border-blue-500/30"
                  : "border border-white/[0.08] bg-white/[0.02]"
              } ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>

              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice !== "문의" && (
                  <span className="text-sm text-gray-500 ml-1">/월</span>
                )}
              </div>

              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {plan.monthlyPrice === "문의"
                  ? "영업팀 문의"
                  : "시작하기"}
              </button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
