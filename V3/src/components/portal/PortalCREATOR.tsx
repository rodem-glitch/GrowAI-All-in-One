"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
    detail:
      "AI가 학습 목표, 대상자 분석, 선수학습 요건을 자동으로 " +
      "파악하고 최적의 콘텐츠 전략을 제안합니다.",
    icon: Lightbulb,
  },
  {
    letter: "R",
    name: "Route Design",
    desc: "학습자마다 다른 길이 있기에,\nAI가 최적의 경로를 설계합니다.",
    detail:
      "모듈 순서, 분기 조건, 선후관계를 AI가 자동 설계하여 " +
      "개인화된 학습 경로를 생성합니다.",
    icon: Route,
  },
  {
    letter: "E",
    name: "Experience Design",
    desc: "지식 전달을 넘어 몰입할 수 있는\n학습 경험 그 자체를 디자인합니다.",
    detail:
      "FKDS 모델 기반으로 감정→인지→실천→공유의 " +
      "몰입형 학습 경험을 설계합니다.",
    icon: Palette,
  },
  {
    letter: "A",
    name: "Artifact Generation",
    desc: "텍스트 · 이미지 · 영상 · 퀴즈까지,\nAI가 학습 콘텐츠를 자동으로 만들어냅니다.",
    detail:
      "Gemini + Claude + Veo를 활용하여 텍스트, 이미지, " +
      "영상, 퀴즈를 자동으로 생성합니다.",
    icon: Wand2,
  },
  {
    letter: "T",
    name: "Transform Apply",
    desc: "만들어진 콘텐츠를 LMS에 바로 연동하고,\n현장에서 즉시 활용할 수 있게 변환합니다.",
    detail:
      "LMS 연동, SCORM 패키징, 반응형 변환을 " +
      "자동으로 처리합니다.",
    icon: ArrowRightLeft,
  },
  {
    letter: "O",
    name: "Optimal Operation",
    desc: "실시간 데이터로 효과를 측정하고,\n운영을 지속적으로 최적화합니다.",
    detail:
      "실시간 학습 분석, A/B 테스트, 성과 대시보드로 " +
      "콘텐츠 효과를 극대화합니다.",
    icon: Settings2,
  },
  {
    letter: "R",
    name: "Reflection",
    desc: "결과를 돌아보고 피드백을 반영하여,\n다음 학습이 더 나아지도록 개선합니다.",
    detail:
      "학습자 피드백, AI 분석 결과를 반영하여 " +
      "콘텐츠와 경로를 지속적으로 개선합니다.",
    icon: RotateCcw,
  },
];

export default function PortalCREATOR() {
  const { colors } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = steps[activeStep].icon;

  return (
    <section
      className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          className={
            "text-sm uppercase tracking-widest " +
            "font-semibold text-center mb-2"
          }
          style={{ color: colors.primary }}
        >
          Methodology
        </p>
        <h2
          className={
            "text-4xl md:text-5xl font-bold " +
            "text-center text-gray-900 dark:text-white"
          }
        >
          CREATOR 7-Step Framework
        </h2>
        <p
          className={
            "text-lg text-gray-500 dark:text-gray-400 " +
            "text-center mt-4"
          }
        >
          체계적인 7단계 교수설계 프레임워크로
          AI 기반 이러닝 콘텐츠를 완성합니다
        </p>

        {/* Step buttons */}
        <div
          className={
            "flex flex-wrap justify-center " +
            "gap-2 md:gap-3 mt-12 mb-10"
          }
        >
          {steps.map((step, i) => (
            <button
              key={`${step.letter}-${step.name}`}
              onClick={() => setActiveStep(i)}
              className={
                "flex flex-col items-center gap-1.5 " +
                "px-4 py-3 rounded-xl border min-w-[80px] " +
                "transition-all duration-300 " +
                (activeStep === i
                  ? "shadow-md"
                  : "border-gray-200 dark:border-gray-800 " +
                    "hover:border-gray-300 " +
                    "dark:hover:border-gray-600")
              }
              style={
                activeStep === i
                  ? {
                      borderColor: colors.primary,
                      backgroundColor: `${colors.primary}0d`,
                    }
                  : undefined
              }
            >
              <span
                className={
                  "w-9 h-9 rounded-lg flex items-center " +
                  "justify-center text-white font-bold text-sm"
                }
                style={{
                  backgroundColor:
                    activeStep === i
                      ? colors.primary
                      : "#9ca3af",
                }}
              >
                {step.letter}
              </span>
              <span
                className={
                  "text-xs font-medium text-center " +
                  "leading-tight " +
                  (activeStep === i
                    ? ""
                    : "text-gray-500 dark:text-gray-400")
                }
                style={
                  activeStep === i
                    ? { color: colors.primary }
                    : undefined
                }
              >
                {step.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active step detail card */}
        <div
          className={
            "max-w-3xl mx-auto bg-white dark:bg-gray-800 " +
            "rounded-2xl border border-gray-200 " +
            "dark:border-gray-800 p-8 md:p-12 shadow-sm"
          }
        >
          <div className="flex items-start gap-6">
            <div
              className={
                "w-16 h-16 rounded-2xl flex " +
                "items-center justify-center shrink-0"
              }
              style={{
                backgroundColor: `${colors.primary}1a`,
              }}
            >
              <ActiveIcon
                className="w-8 h-8"
                style={{ color: colors.primary }}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: colors.primary }}
                >
                  {steps[activeStep].letter}
                </span>
                <h3
                  className={
                    "text-2xl font-bold " +
                    "text-gray-900 dark:text-white"
                  }
                >
                  {steps[activeStep].name}
                </h3>
              </div>
              <p
                className={
                  "text-gray-500 dark:text-gray-400 " +
                  "mb-3 whitespace-pre-line"
                }
              >
                {steps[activeStep].desc}
              </p>
              <p
                className={
                  "text-sm text-gray-500 " +
                  "dark:text-gray-400 leading-relaxed"
                }
              >
                {steps[activeStep].detail}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8 flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={
                  "h-1 flex-1 rounded-full " +
                  "transition-colors duration-300"
                }
                style={{
                  backgroundColor:
                    i <= activeStep
                      ? colors.primary
                      : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
