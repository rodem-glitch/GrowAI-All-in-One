"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clapperboard, Zap, Shield, Globe } from "lucide-react";
import ClaudeIcon from "@/components/icons/ClaudeIcon";

const aiModels = [
  { name: "Gemini 2.5 Pro", role: "Content Intelligence", desc: "멀티모달 콘텐츠 분석 및 생성", icon: Sparkles },
  { name: "Claude Opus", role: "Reasoning Engine", desc: "심층 추론 및 코드 생성", icon: ClaudeIcon },
  { name: "Veo 3.1", role: "Video Generation", desc: "차세대 AI 영상 생성 엔진", icon: Clapperboard },
];

const capabilities = [
  { icon: Zap, label: "실시간 처리", desc: "밀리초 단위 응답" },
  { icon: Shield, label: "엔터프라이즈 보안", desc: "SOC2 / ISO27001" },
  { icon: Globe, label: "글로벌 CDN", desc: "42개국 엣지 서버" },
];

export default function PortalAIEngine() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          AI Engine
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          상상이 영상이 되는 데, 3초.
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4 whitespace-pre-line">
          {"Gemini가 읽고, Claude가 쓰고, Veo가 그립니다.\n세계가 따로 만든 최고를, 우리는 하나로 엮었습니다.\n이것이 GrowAI만의 초격차입니다."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {aiModels.map((model) => {
            const Icon = model.icon;
            return (
              <Card key={model.name} className="rounded-2xl border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow p-0">
                <CardContent className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${colors.primary}1a` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: colors.primary }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{model.name}</h3>
                  <p className="text-sm font-medium mt-1 mb-3" style={{ color: colors.primary }}>{model.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{model.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Convergence */}
        <div className="flex items-center justify-center my-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ border: `2px solid ${colors.primary}`, backgroundColor: `${colors.primary}0d` }}>
            <span className="text-sm font-bold" style={{ color: colors.primary }}>GrowAI</span>
          </div>
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap justify-center gap-8">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.label} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-500 dark:text-gray-500" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{cap.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
