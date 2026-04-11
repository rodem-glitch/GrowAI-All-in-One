"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

/* ── 카테고리 정의 ── */
const CATEGORIES = [
  { key: "all", ko: "전체", en: "All" },
  { key: "ai-tech", ko: "AI 기술", en: "AI Tech" },
  { key: "tutorial", ko: "튜토리얼", en: "Tutorial" },
  { key: "product", ko: "제품", en: "Product" },
  { key: "industry", ko: "산업", en: "Industry" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

/* ── 블로그 포스트 데이터 ── */
interface BlogPost {
  id: number;
  category: CategoryKey;
  titleKo: string;
  titleEn: string;
  excerptKo: string;
  excerptEn: string;
  authorKo: string;
  authorEn: string;
  date: string;
  readTimeMin: number;
  gradient: string;
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    category: "tutorial",
    titleKo: "CREATOR 7단계 활용법",
    titleEn: "How to Use CREATOR 7 Steps",
    excerptKo:
      "AI 영상 제작의 핵심 프레임워크인 " +
      "CREATOR 7단계를 실전에서 활용하는 방법을 " +
      "단계별로 안내합니다.",
    excerptEn:
      "A step-by-step guide to using the " +
      "CREATOR 7-step framework for AI " +
      "video production in practice.",
    authorKo: "김민수",
    authorEn: "Minsu Kim",
    date: "2026-04-06",
    readTimeMin: 7,
    gradient:
      "from-blue-100 to-indigo-200 " +
      "dark:from-blue-900 dark:to-indigo-950",
  },
  {
    id: 2,
    category: "industry",
    titleKo: "제조업 AI 품질 예측 사례",
    titleEn:
      "AI Quality Prediction in Manufacturing",
    excerptKo:
      "제조 현장에서 AI 기반 품질 예측 시스템을 " +
      "도입해 불량률을 획기적으로 줄인 실제 " +
      "사례를 소개합니다.",
    excerptEn:
      "Real-world cases where AI-based " +
      "quality prediction drastically " +
      "reduced defect rates in factories.",
    authorKo: "이지은",
    authorEn: "Jieun Lee",
    date: "2026-04-04",
    readTimeMin: 6,
    gradient:
      "from-emerald-100 to-teal-200 " +
      "dark:from-emerald-900 dark:to-teal-950",
  },
  {
    id: 3,
    category: "tutorial",
    titleKo: "다국어 자막 자동 생성 가이드",
    titleEn:
      "Auto Multi-language Subtitle Guide",
    excerptKo:
      "GrowAI의 다국어 자막 자동 생성 기능으로 " +
      "글로벌 콘텐츠를 손쉽게 제작하는 방법을 " +
      "알아봅니다.",
    excerptEn:
      "Learn how to easily create global " +
      "content with GrowAI's automatic " +
      "multi-language subtitle generation.",
    authorKo: "박서윤",
    authorEn: "Seoyun Park",
    date: "2026-04-02",
    readTimeMin: 5,
    gradient:
      "from-violet-100 to-purple-200 " +
      "dark:from-violet-900 dark:to-purple-950",
  },
  {
    id: 4,
    category: "product",
    titleKo: "GrowAI 2026 로드맵",
    titleEn: "GrowAI 2026 Roadmap",
    excerptKo:
      "2026년 GrowAI의 주요 업데이트 계획과 " +
      "새로운 기능 로드맵을 공개합니다.",
    excerptEn:
      "Unveiling GrowAI's major update " +
      "plans and new feature roadmap " +
      "for 2026.",
    authorKo: "정우진",
    authorEn: "Woojin Jung",
    date: "2026-03-28",
    readTimeMin: 4,
    gradient:
      "from-orange-100 to-amber-200 " +
      "dark:from-orange-900 dark:to-amber-950",
  },
  {
    id: 5,
    category: "ai-tech",
    titleKo: "FKDS 학습 모델 심층 분석",
    titleEn:
      "Deep Dive into FKDS Learning Model",
    excerptKo:
      "Feeling → Knowing → Doing → Sharing " +
      "사이클 기반의 FKDS 학습 모델을 " +
      "심층적으로 분석합니다.",
    excerptEn:
      "An in-depth analysis of the FKDS " +
      "learning model based on the " +
      "Feel-Know-Do-Share cycle.",
    authorKo: "최하늘",
    authorEn: "Haneul Choi",
    date: "2026-03-25",
    readTimeMin: 8,
    gradient:
      "from-pink-100 to-rose-200 " +
      "dark:from-pink-900 dark:to-rose-950",
  },
  {
    id: 6,
    category: "industry",
    titleKo: "IoT 기반 안전 예측 시스템",
    titleEn:
      "IoT-based Safety Prediction System",
    excerptKo:
      "IoT 센서 데이터와 AI를 결합한 " +
      "안전 예측 시스템으로 산업 현장의 " +
      "사고를 미연에 방지합니다.",
    excerptEn:
      "Prevent industrial accidents with " +
      "a safety prediction system that " +
      "combines IoT sensor data and AI.",
    authorKo: "한도윤",
    authorEn: "Doyun Han",
    date: "2026-03-20",
    readTimeMin: 6,
    gradient:
      "from-cyan-100 to-sky-200 " +
      "dark:from-cyan-900 dark:to-sky-950",
  },
];

/* ── Featured Post 데이터 ── */
const FEATURED = {
  category: "ai-tech" as CategoryKey,
  titleKo:
    "Veo 3.1로 혁신하는 영상 생성 AI",
  titleEn:
    "Revolutionizing Video Generation " +
    "with Veo 3.1",
  excerptKo:
    "Google DeepMind의 최신 영상 생성 모델 " +
    "Veo 3.1이 GrowAI 플랫폼에 통합되었습니다. " +
    "더 빠르고, 더 자연스러운 AI 영상 생성의 " +
    "새로운 시대를 경험하세요.",
  excerptEn:
    "Google DeepMind's latest video " +
    "generation model Veo 3.1 is now " +
    "integrated into GrowAI. Experience " +
    "a new era of faster, more natural " +
    "AI video generation.",
  date: "2026-04-08",
  readTimeMin: 5,
  authorKo: "GrowAI 팀",
  authorEn: "GrowAI Team",
};

/* ── 카테고리 라벨 헬퍼 ── */
function catLabel(
  key: CategoryKey,
  isKo: boolean
): string {
  const found = CATEGORIES.find(
    (c) => c.key === key
  );
  return found
    ? isKo
      ? found.ko
      : found.en
    : key;
}

/* ── 메인 컴포넌트 ── */
export default function BlogContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const [activeFilter, setActiveFilter] =
    useState<CategoryKey>("all");

  const filtered =
    activeFilter === "all"
      ? POSTS
      : POSTS.filter(
          (p) => p.category === activeFilter
        );

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16">
        <div
          className={
            "max-w-[1200px] mx-auto px-6 " +
            "text-center"
          }
        >
          <div
            className={
              "inline-flex items-center " +
              "justify-center w-16 h-16 " +
              "rounded-2xl mb-6"
            }
            style={{
              backgroundColor:
                colors.primary + "15",
            }}
          >
            <BookOpen
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>

          <h1
            className={
              "text-4xl md:text-5xl " +
              "font-bold mb-4 " +
              "text-gray-900 " +
              "dark:text-white"
            }
          >
            {isKo
              ? "GrowAI 블로그"
              : "GrowAI Blog"}
          </h1>

          <p
            className={
              "text-lg text-gray-600 " +
              "dark:text-gray-400 " +
              "max-w-2xl mx-auto"
            }
          >
            {isKo
              ? "AI 기술 인사이트, 활용 팁, " +
                "그리고 최신 뉴스를 만나보세요."
              : "Discover AI insights, " +
                "practical tips, and the " +
                "latest news."}
          </p>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="pb-16">
        <div
          className="max-w-[1200px] mx-auto px-6"
        >
          <div
            className={
              "bg-white dark:bg-gray-900 " +
              "border border-gray-200 " +
              "dark:border-gray-800 " +
              "rounded-2xl overflow-hidden " +
              "hover:shadow-lg transition"
            }
          >
            {/* 이미지 플레이스홀더 */}
            <div
              className={
                "h-64 rounded-2xl m-4 " +
                "bg-gradient-to-br " +
                "from-gray-100 to-gray-200 " +
                "dark:from-gray-800 " +
                "dark:to-gray-900"
              }
            />

            <div className="p-6 pt-2">
              {/* 카테고리 태그 */}
              <span
                className={
                  "text-xs font-medium " +
                  "px-2.5 py-1 rounded-full " +
                  "inline-block mb-3"
                }
                style={{
                  backgroundColor:
                    colors.primary + "15",
                  color: colors.primary,
                }}
              >
                {catLabel(
                  FEATURED.category,
                  isKo
                )}
              </span>

              <h2
                className={
                  "text-2xl md:text-3xl " +
                  "font-bold mb-3 " +
                  "text-gray-900 " +
                  "dark:text-white"
                }
              >
                {isKo
                  ? FEATURED.titleKo
                  : FEATURED.titleEn}
              </h2>

              <p
                className={
                  "text-gray-600 " +
                  "dark:text-gray-400 " +
                  "mb-4 max-w-3xl"
                }
              >
                {isKo
                  ? FEATURED.excerptKo
                  : FEATURED.excerptEn}
              </p>

              <div
                className={
                  "flex items-center gap-4 " +
                  "text-sm text-gray-500 " +
                  "dark:text-gray-500"
                }
              >
                <span
                  className={
                    "flex items-center gap-1"
                  }
                >
                  <User className="w-4 h-4" />
                  {isKo
                    ? FEATURED.authorKo
                    : FEATURED.authorEn}
                </span>
                <span>{FEATURED.date}</span>
                <span
                  className={
                    "flex items-center gap-1"
                  }
                >
                  <Clock className="w-4 h-4" />
                  {FEATURED.readTimeMin}
                  {isKo ? "분" : " min"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="pb-10">
        <div
          className={
            "max-w-[1200px] mx-auto px-6 " +
            "flex flex-wrap gap-3"
          }
        >
          {CATEGORIES.map((cat) => {
            const active =
              activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() =>
                  setActiveFilter(cat.key)
                }
                className={
                  "px-4 py-2 rounded-full " +
                  "text-sm font-medium " +
                  "transition " +
                  (active
                    ? "text-white"
                    : "bg-gray-100 " +
                      "dark:bg-gray-800 " +
                      "text-gray-700 " +
                      "dark:text-gray-300 " +
                      "hover:bg-gray-200 " +
                      "dark:hover:bg-gray-700")
                }
                style={
                  active
                    ? {
                        backgroundColor:
                          colors.primary,
                      }
                    : undefined
                }
              >
                {isKo ? cat.ko : cat.en}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="pb-16">
        <div
          className={
            "max-w-[1200px] mx-auto px-6 " +
            "grid grid-cols-1 " +
            "md:grid-cols-2 " +
            "lg:grid-cols-3 gap-8"
          }
        >
          {filtered.map((post) => (
            <article
              key={post.id}
              className={
                "bg-white dark:bg-gray-900 " +
                "border border-gray-200 " +
                "dark:border-gray-800 " +
                "rounded-2xl overflow-hidden " +
                "hover:shadow-lg transition " +
                "group cursor-pointer"
              }
            >
              {/* 이미지 플레이스홀더 */}
              <div
                className={
                  "h-48 rounded-xl m-3 " +
                  "bg-gradient-to-br " +
                  post.gradient
                }
              />

              <div className="p-5 pt-2">
                {/* 카테고리 태그 */}
                <span
                  className={
                    "text-xs font-medium " +
                    "px-2.5 py-1 rounded-full " +
                    "inline-block mb-2"
                  }
                  style={{
                    backgroundColor:
                      colors.primary + "15",
                    color: colors.primary,
                  }}
                >
                  {catLabel(
                    post.category,
                    isKo
                  )}
                </span>

                {/* 제목 */}
                <h3
                  className={
                    "font-semibold text-lg " +
                    "mb-2 text-gray-900 " +
                    "dark:text-white " +
                    "group-hover:underline"
                  }
                >
                  {isKo
                    ? post.titleKo
                    : post.titleEn}
                </h3>

                {/* 발췌문 */}
                <p
                  className={
                    "text-sm text-gray-600 " +
                    "dark:text-gray-400 " +
                    "line-clamp-2 mb-4"
                  }
                >
                  {isKo
                    ? post.excerptKo
                    : post.excerptEn}
                </p>

                {/* 푸터: 아바타 + 메타 */}
                <div
                  className={
                    "flex items-center gap-3 " +
                    "text-xs text-gray-500 " +
                    "dark:text-gray-500"
                  }
                >
                  {/* 아바타 원형 */}
                  <div
                    className={
                      "w-7 h-7 rounded-full " +
                      "bg-gray-300 " +
                      "dark:bg-gray-700 " +
                      "flex items-center " +
                      "justify-center"
                    }
                  >
                    <User
                      className="w-3.5 h-3.5"
                    />
                  </div>

                  <span className="font-medium">
                    {isKo
                      ? post.authorKo
                      : post.authorEn}
                  </span>

                  <span className="ml-auto">
                    {post.date}
                  </span>

                  <span
                    className={
                      "flex items-center gap-1"
                    }
                  >
                    <Clock
                      className="w-3.5 h-3.5"
                    />
                    {post.readTimeMin}
                    {isKo ? "분" : " min"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Load More ── */}
      <section className="pb-24">
        <div
          className={
            "max-w-[1200px] mx-auto px-6 " +
            "flex justify-center"
          }
        >
          <button
            className={
              "inline-flex items-center " +
              "gap-2 px-6 py-3 rounded-xl " +
              "font-medium text-white " +
              "transition hover:opacity-90"
            }
            style={{
              backgroundColor: colors.primary,
            }}
          >
            {isKo ? "더 보기" : "Load More"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
