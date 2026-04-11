"use client";

import { useInView } from "@/hooks/useInView";
import { Sparkles, Brain, Clapperboard, Zap, Shield, Globe } from "lucide-react";

const aiModels = [
  {
    name: "Gemini 2.5 Pro",
    role: "Content Intelligence",
    desc: "멀티모달 콘텐츠 분석 및 생성",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-500",
    glow: "shadow-blue-500/20",
  },
  {
    name: "Claude Opus",
    role: "Reasoning Engine",
    desc: "심층 추론 및 코드 생성",
    icon: Brain,
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-orange-500/20",
  },
  {
    name: "Veo 3.1",
    role: "Video Generation",
    desc: "차세대 AI 영상 생성 엔진",
    icon: Clapperboard,
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
];

const capabilities = [
  { icon: Zap, label: "실시간 처리", desc: "밀리초 단위 응답" },
  { icon: Shield, label: "엔터프라이즈 보안", desc: "SOC2 / ISO27001" },
  { icon: Globe, label: "글로벌 CDN", desc: "42개국 엣지 서버" },
];

export default function PortalAIEngine() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 md:py-32 px-6 bg-[#06060a] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 to-violet-600/10 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-violet-400 mb-4">
            AI Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 whitespace-pre-line">
            {"세 개의 AI가 하나로 만날 때,\n불가능이 가능이 됩니다."}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto whitespace-pre-line">
            {"Gemini · Claude · Veo — 세계 최고 수준의 AI 모델 3종을\n하나의 플랫폼에서 통합 운영합니다."}
          </p>
        </div>

        {/* AI Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {aiModels.map((model, i) => {
            const Icon = model.icon;
            return (
              <div
                key={model.name}
                className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center hover:-translate-y-1 transition-all duration-500 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${model.gradient} flex items-center justify-center mx-auto mb-6 shadow-xl ${model.glow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {model.name}
                </h3>
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  {model.role}
                </p>
                <p className="text-sm text-gray-400">{model.desc}</p>

                {/* Connecting lines visual */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-white/20 to-transparent hidden md:block" />
              </div>
            );
          })}
        </div>

        {/* Convergence visual */}
        <div
          className={`flex items-center justify-center mb-12 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#06060a] flex items-center justify-center">
              <span className="text-sm font-bold text-white">GrowAI</span>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap justify-center gap-8">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.label}
                className={`flex items-center gap-3 transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}
              >
                <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-gray-300">
                    {cap.label}
                  </div>
                  <div className="text-xs text-gray-600">{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
