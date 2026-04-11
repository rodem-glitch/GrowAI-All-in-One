"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import {
  Lightbulb,
  Route,
  Palette,
  Wand2,
  ArrowRightLeft,
  Settings2,
  RotateCcw,
} from "lucide-react";

const steps = [
  {
    letter: "C",
    name: "Concept",
    desc: "무엇을 왜 가르칠 것인가를 정의하고,\n학습의 출발점을 명확히 세웁니다.",
    detail: "AI가 학습 목표, 대상자 분석, 선수학습 요건을 자동으로 파악하고 최적의 콘텐츠 전략을 제안합니다.",
    icon: Lightbulb,
    color: "from-blue-500 to-blue-400",
  },
  {
    letter: "R",
    name: "Route Design",
    desc: "학습자마다 다른 길이 있기에,\nAI가 최적의 경로를 설계합니다.",
    detail: "모듈 순서, 분기 조건, 선후관계를 AI가 자동 설계하여 개인화된 학습 경로를 생성합니다.",
    icon: Route,
    color: "from-cyan-500 to-cyan-400",
  },
  {
    letter: "E",
    name: "Experience Design",
    desc: "지식 전달을 넘어 몰입할 수 있는\n학습 경험 그 자체를 디자인합니다.",
    detail: "FKDS 모델 기반으로 감정→인지→실천→공유의 몰입형 학습 경험을 설계합니다.",
    icon: Palette,
    color: "from-emerald-500 to-emerald-400",
  },
  {
    letter: "A",
    name: "Artifact Generation",
    desc: "텍스트 · 이미지 · 영상 · 퀴즈까지,\nAI가 학습 콘텐츠를 자동으로 만들어냅니다.",
    detail: "Gemini + Claude + Veo를 활용하여 텍스트, 이미지, 영상, 퀴즈를 자동으로 생성합니다.",
    icon: Wand2,
    color: "from-violet-500 to-violet-400",
  },
  {
    letter: "T",
    name: "Transform Apply",
    desc: "만들어진 콘텐츠를 LMS에 바로 연동하고,\n현장에서 즉시 활용할 수 있게 변환합니다.",
    detail: "LMS 연동, SCORM 패키징, 반응형 변환을 자동으로 처리합니다.",
    icon: ArrowRightLeft,
    color: "from-pink-500 to-pink-400",
  },
  {
    letter: "O",
    name: "Optimal Operation",
    desc: "실시간 데이터로 효과를 측정하고,\n운영을 지속적으로 최적화합니다.",
    detail: "실시간 학습 분석, A/B 테스트, 성과 대시보드로 콘텐츠 효과를 극대화합니다.",
    icon: Settings2,
    color: "from-orange-500 to-orange-400",
  },
  {
    letter: "R",
    name: "Reflection",
    desc: "결과를 돌아보고 피드백을 반영하여,\n다음 학습이 더 나아지도록 개선합니다.",
    detail: "학습자 피드백, AI 분석 결과를 반영하여 콘텐츠와 경로를 지속적으로 개선합니다.",
    icon: RotateCcw,
    color: "from-amber-500 to-amber-400",
  },
];

export default function PortalCREATOR() {
  const { ref, isInView } = useInView();
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = steps[activeStep].icon;

  return (
    <section className="py-24 md:py-32 px-6 bg-[#08080e] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-r from-blue-600/5 to-violet-600/5 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">
            Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CREATOR 7-Step Framework
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            체계적인 7단계 교수설계 프레임워크로
            AI 기반 이러닝 콘텐츠를 완성합니다
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {steps.map((step, i) => (
            <button
              key={`${step.letter}-${step.name}`}
              onClick={() => setActiveStep(i)}
              className={`group flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all duration-300 min-w-[80px] ${
                activeStep === i
                  ? "border-white/20 bg-white/10 scale-105"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05]"
              } ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm`}
              >
                {step.letter}
              </span>
              <span
                className={`text-xs font-medium text-center leading-tight ${
                  activeStep === i ? "text-white" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div
          className={`max-w-3xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 transition-all duration-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center shrink-0 shadow-lg`}
            >
              <ActiveIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`text-3xl font-extrabold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}
                >
                  {steps[activeStep].letter}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {steps[activeStep].name}
                </h3>
              </div>
              <p className="text-gray-400 mb-3">{steps[activeStep].desc}</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {steps[activeStep].detail}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= activeStep ? "bg-white/30" : "bg-white/[0.06]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
