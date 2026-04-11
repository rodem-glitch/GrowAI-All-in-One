"use client";

import { useState } from "react";
import {
  Sparkles,
  Flame,
  Zap,
  Bug,
  Star,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

type Category = "new" | "improved" | "fixed";

interface Change {
  text: { ko: string; en: string };
  category: Category;
}

interface Release {
  version: string;
  date: string;
  title: { ko: string; en: string };
  icon: React.ElementType;
  changes: Change[];
}

const releases: Release[] = [
  {
    version: "v3.8.1",
    date: "2026-04-01",
    title: {
      ko: "안정성 개선 및 버그 수정",
      en: "Stability & Bug Fixes",
    },
    icon: Bug,
    changes: [
      {
        text: {
          ko: "대시보드 로딩 속도 40% 개선",
          en: "Dashboard loading speed improved by 40%",
        },
        category: "improved",
      },
      {
        text: {
          ko: "영상 내보내기 시 간헐적 오류 수정",
          en: "Fixed intermittent video export errors",
        },
        category: "fixed",
      },
      {
        text: {
          ko: "다크 모드 색상 대비 최적화",
          en: "Optimized dark mode color contrast",
        },
        category: "improved",
      },
      {
        text: {
          ko: "모바일 반응형 레이아웃 개선",
          en: "Improved mobile responsive layout",
        },
        category: "fixed",
      },
    ],
  },
  {
    version: "v3.8.0",
    date: "2026-03-15",
    title: {
      ko: "Veo 3.1 영상 생성 및 새 AI 모델",
      en: "Veo 3.1 Video Generation & New AI Models",
    },
    icon: Flame,
    changes: [
      {
        text: {
          ko: "Google Veo 3.1 기반 고품질 영상 생성",
          en: "High-quality video generation with Veo 3.1",
        },
        category: "new",
      },
      {
        text: {
          ko: "Gemini 2.5 Pro 스크립트 자동 작성",
          en: "Gemini 2.5 Pro auto script generation",
        },
        category: "new",
      },
      {
        text: {
          ko: "영상 해상도 4K UHD 지원",
          en: "4K UHD video resolution support",
        },
        category: "new",
      },
      {
        text: {
          ko: "AI 모델 응답 속도 2배 향상",
          en: "AI model response speed doubled",
        },
        category: "improved",
      },
    ],
  },
  {
    version: "v3.7.0",
    date: "2026-02-20",
    title: {
      ko: "다국어 챗봇 및 20개 언어 지원",
      en: "Multi-language Chatbot & 20 Languages",
    },
    icon: Zap,
    changes: [
      {
        text: {
          ko: "AI 챗봇 20개 언어 실시간 지원",
          en: "AI chatbot supports 20 languages in real-time",
        },
        category: "new",
      },
      {
        text: {
          ko: "자동 번역 품질 BLEU 점수 92+ 달성",
          en: "Auto-translation quality BLEU score 92+",
        },
        category: "improved",
      },
      {
        text: {
          ko: "RTL 언어 (아랍어, 히브리어) 레이아웃",
          en: "RTL language (Arabic, Hebrew) layout",
        },
        category: "new",
      },
      {
        text: {
          ko: "언어 자동 감지 정확도 개선",
          en: "Improved language auto-detection accuracy",
        },
        category: "improved",
      },
    ],
  },
  {
    version: "v3.6.0",
    date: "2026-01-10",
    title: {
      ko: "제조 AI 플랫폼 출시",
      en: "Manufacturing AI Platform Launch",
    },
    icon: Star,
    changes: [
      {
        text: {
          ko: "제조 현장 맞춤 AI 교육 콘텐츠 생성",
          en: "AI training content for manufacturing",
        },
        category: "new",
      },
      {
        text: {
          ko: "안전 교육 시나리오 자동 생성",
          en: "Auto-generated safety training scenarios",
        },
        category: "new",
      },
      {
        text: {
          ko: "산업별 템플릿 50종 추가",
          en: "Added 50 industry-specific templates",
        },
        category: "new",
      },
      {
        text: {
          ko: "대용량 파일 업로드 안정성 개선",
          en: "Improved large file upload stability",
        },
        category: "fixed",
      },
    ],
  },
  {
    version: "v3.5.0",
    date: "2025-12-01",
    title: {
      ko: "CREATOR 7단계 프레임워크 통합",
      en: "CREATOR 7-Step Framework Integration",
    },
    icon: Sparkles,
    changes: [
      {
        text: {
          ko: "C→R→E→A→T→O→R 7단계 워크플로",
          en: "C→R→E→A→T→O→R 7-step workflow",
        },
        category: "new",
      },
      {
        text: {
          ko: "단계별 진행률 시각화 대시보드",
          en: "Step-by-step progress dashboard",
        },
        category: "new",
      },
      {
        text: {
          ko: "AI 기반 자동 피드백 및 개선 제안",
          en: "AI-powered auto feedback & suggestions",
        },
        category: "new",
      },
      {
        text: {
          ko: "콘텐츠 품질 점수 자동 산출",
          en: "Automated content quality scoring",
        },
        category: "improved",
      },
    ],
  },
];

const categoryConfig: Record<
  Category,
  { label: { ko: string; en: string }; className: string }
> = {
  new: {
    label: { ko: "신규", en: "New" },
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 "
      + "dark:text-green-400",
  },
  improved: {
    label: { ko: "개선", en: "Improved" },
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 "
      + "dark:text-blue-400",
  },
  fixed: {
    label: { ko: "수정", en: "Fixed" },
    className:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 "
      + "dark:text-orange-400",
  },
};

export default function WhatsNewContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const isKo = locale === "ko";

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16
              rounded-2xl mb-6"
            style={{
              backgroundColor: colors.primary + "15",
            }}
          >
            <Sparkles
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold
              text-gray-900 dark:text-white mb-4"
          >
            {isKo ? "새 소식" : "What's New"}
          </h1>
          <p
            className="text-lg text-gray-500 dark:text-gray-400
              max-w-xl mx-auto"
          >
            {isKo
              ? "GrowAI의 최신 업데이트, 새 기능, 개선 사항을 확인하세요."
              : "Discover the latest updates, new features, "
                + "and improvements in GrowAI."}
          </p>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="border-l-2 ml-4 md:ml-8 space-y-12"
            style={{
              borderColor: colors.primary + "30",
            }}
          >
            {releases.map((release, idx) => {
              const Icon = release.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={release.version}
                  className="relative pl-8 md:pl-12"
                >
                  {/* 타임라인 dot */}
                  <div
                    className="absolute -left-[9px] top-1 w-4 h-4
                      rounded-full border-2 border-white
                      dark:border-gray-950"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                  />

                  {/* 카드 */}
                  <div
                    className={`rounded-2xl p-6 ${
                      isEven
                        ? "bg-gray-50 dark:bg-gray-900/50"
                        : "bg-white dark:bg-gray-900"
                    }`}
                  >
                    {/* 헤더 */}
                    <div
                      className="flex flex-wrap items-center
                        gap-3 mb-4"
                    >
                      <span
                        className="text-sm font-medium
                          text-gray-500 dark:text-gray-400"
                      >
                        {release.date}
                      </span>
                      <span
                        className="text-xs font-semibold px-2.5
                          py-0.5 rounded-full"
                        style={{
                          backgroundColor:
                            colors.primary + "15",
                          color: colors.primary,
                        }}
                      >
                        {release.version}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <Icon
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: colors.primary }}
                      />
                      <h2
                        className="text-xl font-bold
                          text-gray-900 dark:text-white"
                      >
                        {isKo
                          ? release.title.ko
                          : release.title.en}
                      </h2>
                    </div>

                    {/* 변경사항 리스트 */}
                    <ul className="space-y-3">
                      {release.changes.map((change, ci) => {
                        const cat =
                          categoryConfig[change.category];
                        return (
                          <li
                            key={ci}
                            className="flex items-start gap-3"
                          >
                            <span
                              className={`text-[11px] font-semibold
                                px-2 py-0.5 rounded-full
                                mt-0.5 flex-shrink-0
                                ${cat.className}`}
                            >
                              {isKo
                                ? cat.label.ko
                                : cat.label.en}
                            </span>
                            <span
                              className="text-sm text-gray-700
                                dark:text-gray-300"
                            >
                              {isKo
                                ? change.text.ko
                                : change.text.en}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Subscribe ── */}
      <section className="pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-8
              md:p-12 text-center"
            style={{
              backgroundColor: colors.primary + "08",
            }}
          >
            <h2
              className="text-2xl font-bold text-gray-900
                dark:text-white mb-2"
            >
              {isKo
                ? "업데이트 알림 받기"
                : "Get Notified"}
            </h2>
            <p
              className="text-gray-500 dark:text-gray-400
                mb-6"
            >
              {isKo
                ? "새로운 기능과 업데이트 소식을 이메일로 받아보세요."
                : "Get the latest features and updates "
                  + "delivered to your inbox."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3
                max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  isKo
                    ? "이메일 주소를 입력하세요"
                    : "Enter your email"
                }
                className="flex-1 px-4 py-3 rounded-xl border
                  border-gray-200 dark:border-gray-800
                  bg-white dark:bg-gray-900 text-sm
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2
                  focus:ring-offset-0"
                style={{
                  // eslint-disable-next-line
                  // @ts-ignore -- ring color
                  "--tw-ring-color":
                    colors.primary + "40",
                } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm
                  font-semibold text-white transition-opacity
                  hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                {isKo ? "구독하기" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
