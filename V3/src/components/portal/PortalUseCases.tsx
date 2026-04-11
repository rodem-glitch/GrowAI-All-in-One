"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Factory, Building2, Stethoscope } from "lucide-react";

const useCases = [
  { icon: GraduationCap, industry: "교육 · Education", title: "AI 기반 이러닝 혁신", items: ["CREATOR 7단계 교수설계 자동화", "FKDS 순환 학습 모델 적용", "멀티 AI 콘텐츠 자동 생성", "LMS 원클릭 연동"] },
  { icon: Factory, industry: "제조 · Manufacturing", title: "제조 AI", items: ["실시간 품질 예측 및 불량 감지", "공정 최적화 AI 엔진", "예지보전 (Predictive Maintenance)", "디지털 트윈 연동"] },
  { icon: Building2, industry: "건설 · Construction", title: "AI 건설 현장 관리", items: ["IoT 센서 실시간 모니터링", "안전 사고 예측 AI", "공정 관리 자동화", "BIM 데이터 통합"] },
  { icon: Stethoscope, industry: "헬스케어 · Healthcare", title: "AI 의료 교육", items: ["AI 의료 시뮬레이션", "임상 사례 자동 생성", "다국어 의학 용어 번역", "HIPAA 준수 보안"] },
];

export default function PortalUseCases() {
  const { colors } = useTheme();

  return (
    <section className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          Use Cases
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
          Industry Solutions
        </h2>
        <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 whitespace-pre-line">
          {"산업마다 현장이 다르기에, AI도 달라야 합니다.\n교육 · 제조 · 건설 · 헬스케어 각 분야에 최적화된 솔루션"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <Card key={uc.industry} className="rounded-2xl border-[#d7dadb] dark:border-gray-700 hover:shadow-xl transition-shadow p-0">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${colors.primary}1a` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: colors.primary }} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: colors.primary }}>{uc.industry}</span>
                      <h3 className="text-xl font-bold text-[#242727] dark:text-white mt-1 mb-4">{uc.title}</h3>
                      <ul className="space-y-2">
                        {uc.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-[#555c5d] dark:text-gray-400">
                            <svg className="w-4 h-4 shrink-0" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
