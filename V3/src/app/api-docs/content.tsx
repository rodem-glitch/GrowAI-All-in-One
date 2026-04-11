"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Code2,
  Copy,
  Check,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Key,
  FileJson,
  Video,
  MessageSquare,
  Captions,
  FileSearch,
  Gauge,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── API 엔드포인트 카테고리 ── */
interface Endpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  descKo: string;
  descEn: string;
}

interface ApiCategory {
  icon: LucideIcon;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
  endpoints: Endpoint[];
}

const API_CATEGORIES: ApiCategory[] = [
  {
    icon: Video,
    titleKo: "영상 생성",
    titleEn: "Video Generation",
    descKo: "AI 기반 영상 자동 생성 API",
    descEn: "AI-powered video generation API",
    endpoints: [
      {
        method: "POST",
        path: "/v1/videos/generate",
        descKo: "텍스트 프롬프트로 영상 생성",
        descEn: "Generate video from text prompt",
      },
      {
        method: "GET",
        path: "/v1/videos/{id}",
        descKo: "영상 생성 상태 조회",
        descEn: "Get video generation status",
      },
      {
        method: "GET",
        path: "/v1/videos",
        descKo: "영상 목록 조회",
        descEn: "List all videos",
      },
      {
        method: "DELETE",
        path: "/v1/videos/{id}",
        descKo: "영상 삭제",
        descEn: "Delete a video",
      },
    ],
  },
  {
    icon: Captions,
    titleKo: "자막",
    titleEn: "Subtitles",
    descKo: "다국어 자막 자동 생성 및 번역",
    descEn: "Auto subtitle generation & translation",
    endpoints: [
      {
        method: "POST",
        path: "/v1/subtitles/generate",
        descKo: "영상에서 자막 자동 생성",
        descEn: "Generate subtitles from video",
      },
      {
        method: "POST",
        path: "/v1/subtitles/translate",
        descKo: "자막 번역",
        descEn: "Translate subtitles",
      },
      {
        method: "GET",
        path: "/v1/subtitles/{id}",
        descKo: "자막 데이터 조회",
        descEn: "Get subtitle data",
      },
    ],
  },
  {
    icon: FileSearch,
    titleKo: "영상 요약",
    titleEn: "Video Summary",
    descKo: "AI 기반 영상 요약 및 챕터 분할",
    descEn: "AI video summarization & chapters",
    endpoints: [
      {
        method: "POST",
        path: "/v1/summaries/generate",
        descKo: "영상 요약 생성",
        descEn: "Generate video summary",
      },
      {
        method: "GET",
        path: "/v1/summaries/{id}",
        descKo: "요약 결과 조회",
        descEn: "Get summary result",
      },
    ],
  },
  {
    icon: MessageSquare,
    titleKo: "챗봇",
    titleEn: "Chatbot",
    descKo: "AI 다국어 챗봇 관리",
    descEn: "AI multilingual chatbot management",
    endpoints: [
      {
        method: "POST",
        path: "/v1/chatbot/messages",
        descKo: "챗봇에 메시지 전송",
        descEn: "Send message to chatbot",
      },
      {
        method: "GET",
        path: "/v1/chatbot/conversations",
        descKo: "대화 이력 조회",
        descEn: "List conversation history",
      },
      {
        method: "PUT",
        path: "/v1/chatbot/config",
        descKo: "챗봇 설정 업데이트",
        descEn: "Update chatbot configuration",
      },
    ],
  },
  {
    icon: Gauge,
    titleKo: "분석",
    titleEn: "Analytics",
    descKo: "사용량 및 성능 데이터 조회",
    descEn: "Usage and performance analytics",
    endpoints: [
      {
        method: "GET",
        path: "/v1/analytics/usage",
        descKo: "API 사용량 통계",
        descEn: "API usage statistics",
      },
      {
        method: "GET",
        path: "/v1/analytics/performance",
        descKo: "성능 메트릭 조회",
        descEn: "Performance metrics",
      },
    ],
  },
];

/* ── SDK 목록 ── */
interface SdkItem {
  lang: string;
  install: string;
  color: string;
}

const SDKS: SdkItem[] = [
  {
    lang: "Python",
    install: "pip install growai",
    color: "#3776AB",
  },
  {
    lang: "Node.js",
    install: "npm install @growai/sdk",
    color: "#339933",
  },
  {
    lang: "Go",
    install: "go get github.com/growai/sdk-go",
    color: "#00ADD8",
  },
  {
    lang: "Java",
    install:
      "implementation 'ai.grow:sdk:1.0.0'",
    color: "#ED8B00",
  },
];

/* ── 코드 예제 ── */
const CODE_EXAMPLE_PYTHON = `import growai

client = growai.Client(api_key="YOUR_API_KEY")

# 영상 생성
video = client.videos.generate(
    prompt="5분 분량 Python 입문 강의",
    language="ko",
    style="education",
    resolution="1080p"
)

print(f"Video ID: {video.id}")
print(f"Status: {video.status}")`;

const CODE_EXAMPLE_JS = `import { GrowAI } from '@growai/sdk';

const client = new GrowAI({
  apiKey: 'YOUR_API_KEY',
});

// 영상 생성
const video = await client.videos.generate({
  prompt: '5분 분량 Python 입문 강의',
  language: 'ko',
  style: 'education',
  resolution: '1080p',
});

console.log(\`Video ID: \${video.id}\`);
console.log(\`Status: \${video.status}\`);`;

/* ── HTTP 메서드 색상 ── */
const METHOD_COLORS: Record<string, string> = {
  GET: "#22c55e",
  POST: "#3b82f6",
  PUT: "#f59e0b",
  DELETE: "#ef4444",
};

/* ── CopyButton 컴포넌트 ── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg hover:bg-gray-700
        transition-colors text-gray-400
        hover:text-gray-200"
      aria-label="Copy"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

/* ── 메인 컴포넌트 ── */
export default function ApiDocsContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const [activeTab, setActiveTab] = useState<
    "python" | "javascript"
  >("python");

  const [expandedCategory, setExpandedCategory] =
    useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16">
        <div
          className="max-w-[1200px] mx-auto px-6
            text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex
              items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: colors.primary + "15",
            }}
          >
            <Code2
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold
              text-gray-900 dark:text-white mb-4"
          >
            {isKo ? "API 문서" : "API Documentation"}
          </h1>

          <p
            className="text-lg text-gray-600
              dark:text-gray-400 max-w-2xl mx-auto"
          >
            {isKo
              ? "GrowAI API로 AI 영상 생성, 자막, 요약 기능을 앱에 통합하세요."
              : "Integrate AI video generation, subtitles, and summarization into your app with the GrowAI API."}
          </p>

          <div
            className="mt-8 flex flex-col sm:flex-row
              items-center justify-center gap-4"
          >
            <a
              href="#quickstart"
              className="inline-flex items-center gap-2
                px-6 py-3 rounded-xl font-medium
                text-white transition hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isKo ? "빠른 시작" : "Quick Start"}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#endpoints"
              className="inline-flex items-center gap-2
                px-6 py-3 rounded-xl font-medium
                border border-gray-200
                dark:border-gray-800
                text-gray-700 dark:text-gray-300
                hover:bg-gray-50 dark:hover:bg-gray-900
                transition"
            >
              {isKo
                ? "엔드포인트 보기"
                : "View Endpoints"}
            </a>
          </div>
        </div>
      </section>

      {/* ── 핵심 특징 ── */}
      <section className="pb-16">
        <div
          className="max-w-[1200px] mx-auto px-6
            grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Zap,
              titleKo: "초고속 응답",
              titleEn: "Ultra-fast Response",
              descKo: "글로벌 엣지 네트워크로 50ms 이내 API 응답",
              descEn:
                "Sub-50ms API response via global edge network",
            },
            {
              icon: Shield,
              titleKo: "엔터프라이즈 보안",
              titleEn: "Enterprise Security",
              descKo: "OAuth 2.0, API 키 관리, IP 화이트리스트",
              descEn:
                "OAuth 2.0, API key management, IP whitelisting",
            },
            {
              icon: Globe,
              titleKo: "다국어 지원",
              titleEn: "Multi-language",
              descKo: "20개 이상 언어 지원, 자동 감지",
              descEn:
                "20+ languages supported with auto-detection",
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.titleEn}
                className="bg-white dark:bg-gray-900
                  border border-gray-200
                  dark:border-gray-800
                  rounded-2xl p-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex
                    items-center justify-center mb-4"
                  style={{
                    backgroundColor:
                      colors.primary + "15",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: colors.primary }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold
                    text-gray-900 dark:text-white mb-2"
                >
                  {isKo ? feat.titleKo : feat.titleEn}
                </h3>
                <p
                  className="text-sm text-gray-600
                    dark:text-gray-400"
                >
                  {isKo ? feat.descKo : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 인증 (Quick Start) ── */}
      <section id="quickstart" className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-2"
          >
            {isKo ? "인증" : "Authentication"}
          </h2>
          <p
            className="text-gray-600
              dark:text-gray-400 mb-6"
          >
            {isKo
              ? "모든 API 요청에 Bearer 토큰을 포함하세요."
              : "Include a Bearer token in all API requests."}
          </p>

          <div
            className="bg-gray-900 dark:bg-gray-800
              rounded-2xl overflow-hidden"
          >
            <div
              className="flex items-center justify-between
                px-4 py-3 border-b border-gray-700"
            >
              <div className="flex items-center gap-2">
                <Key
                  className="w-4 h-4 text-gray-400"
                />
                <span
                  className="text-sm text-gray-400
                    font-mono"
                >
                  HTTP Header
                </span>
              </div>
              <CopyButton
                text='Authorization: Bearer YOUR_API_KEY'
              />
            </div>
            <pre
              className="px-4 py-4 text-sm
                text-green-400 font-mono
                overflow-x-auto"
            >
              <code>
                {`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── SDK 설치 ── */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-2"
          >
            SDK
          </h2>
          <p
            className="text-gray-600
              dark:text-gray-400 mb-6"
          >
            {isKo
              ? "주요 언어별 공식 SDK를 제공합니다."
              : "Official SDKs for major languages."}
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2
              lg:grid-cols-4 gap-4"
          >
            {SDKS.map((sdk) => (
              <div
                key={sdk.lang}
                className="bg-white dark:bg-gray-900
                  border border-gray-200
                  dark:border-gray-800
                  rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: sdk.color,
                    }}
                  />
                  <span
                    className="font-semibold
                      text-gray-900 dark:text-white"
                  >
                    {sdk.lang}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2
                    bg-gray-100 dark:bg-gray-800
                    rounded-lg px-3 py-2"
                >
                  <Terminal
                    className="w-4 h-4 text-gray-400
                      shrink-0"
                  />
                  <code
                    className="text-xs text-gray-700
                      dark:text-gray-300 font-mono
                      truncate flex-1"
                  >
                    {sdk.install}
                  </code>
                  <CopyButton text={sdk.install} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 코드 예제 ── */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-2"
          >
            {isKo ? "코드 예제" : "Code Example"}
          </h2>
          <p
            className="text-gray-600
              dark:text-gray-400 mb-6"
          >
            {isKo
              ? "몇 줄의 코드로 AI 영상을 생성하세요."
              : "Generate AI videos with just a few lines of code."}
          </p>

          <div
            className="bg-gray-900 dark:bg-gray-800
              rounded-2xl overflow-hidden"
          >
            {/* 탭 헤더 */}
            <div
              className="flex items-center gap-0
                border-b border-gray-700"
            >
              {(
                [
                  { key: "python", label: "Python" },
                  {
                    key: "javascript",
                    label: "JavaScript",
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-sm font-medium
                    transition-colors ${
                      activeTab === tab.key
                        ? "text-white border-b-2"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  style={
                    activeTab === tab.key
                      ? {
                          borderColor: colors.primary,
                        }
                      : undefined
                  }
                >
                  {tab.label}
                </button>
              ))}
              <div className="ml-auto pr-3">
                <CopyButton
                  text={
                    activeTab === "python"
                      ? CODE_EXAMPLE_PYTHON
                      : CODE_EXAMPLE_JS
                  }
                />
              </div>
            </div>

            {/* 코드 본문 */}
            <pre
              className="px-4 py-4 text-sm font-mono
                overflow-x-auto text-gray-300"
            >
              <code>
                {activeTab === "python"
                  ? CODE_EXAMPLE_PYTHON
                  : CODE_EXAMPLE_JS}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── API 엔드포인트 목록 ── */}
      <section id="endpoints" className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-2"
          >
            {isKo
              ? "API 엔드포인트"
              : "API Endpoints"}
          </h2>
          <p
            className="text-gray-600
              dark:text-gray-400 mb-8"
          >
            {isKo
              ? "Base URL: https://api.growai.com"
              : "Base URL: https://api.growai.com"}
          </p>

          <div className="space-y-4">
            {API_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isExpanded =
                expandedCategory === cat.titleEn;

              return (
                <div
                  key={cat.titleEn}
                  className="bg-white dark:bg-gray-900
                    border border-gray-200
                    dark:border-gray-800
                    rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        isExpanded
                          ? null
                          : cat.titleEn
                      )
                    }
                    className="w-full flex items-center
                      gap-4 p-6 text-left
                      hover:bg-gray-50
                      dark:hover:bg-gray-800/50
                      transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl
                        flex items-center
                        justify-center shrink-0"
                      style={{
                        backgroundColor:
                          colors.primary + "15",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="font-semibold
                          text-gray-900 dark:text-white"
                      >
                        {isKo
                          ? cat.titleKo
                          : cat.titleEn}
                      </h3>
                      <p
                        className="text-sm
                          text-gray-500
                          dark:text-gray-400"
                      >
                        {isKo
                          ? cat.descKo
                          : cat.descEn}
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium
                        px-2.5 py-1 rounded-full
                        bg-gray-100 dark:bg-gray-800
                        text-gray-600
                        dark:text-gray-400"
                    >
                      {cat.endpoints.length}{" "}
                      {isKo
                        ? "개 엔드포인트"
                        : "endpoints"}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className={`shrink-0
                        text-gray-400
                        transition-transform
                        duration-200 ${
                          isExpanded
                            ? "rotate-180"
                            : ""
                        }`}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div
                      className="border-t
                        border-gray-200
                        dark:border-gray-800"
                    >
                      {cat.endpoints.map((ep) => (
                        <div
                          key={ep.method + ep.path}
                          className="flex items-center
                            gap-4 px-6 py-4
                            border-b last:border-b-0
                            border-gray-100
                            dark:border-gray-800/50
                            hover:bg-gray-50
                            dark:hover:bg-gray-800/30
                            transition-colors"
                        >
                          <span
                            className="text-xs
                              font-bold
                              tracking-wider
                              uppercase
                              w-16 text-center
                              py-1 rounded-md"
                            style={{
                              backgroundColor:
                                METHOD_COLORS[
                                  ep.method
                                ] + "15",
                              color:
                                METHOD_COLORS[
                                  ep.method
                                ],
                            }}
                          >
                            {ep.method}
                          </span>
                          <code
                            className="text-sm
                              font-mono
                              text-gray-700
                              dark:text-gray-300
                              flex-1"
                          >
                            {ep.path}
                          </code>
                          <span
                            className="text-sm
                              text-gray-500
                              dark:text-gray-400
                              hidden sm:block"
                          >
                            {isKo
                              ? ep.descKo
                              : ep.descEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Rate Limits ── */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-6"
          >
            {isKo ? "요청 제한" : "Rate Limits"}
          </h2>

          <div
            className="bg-white dark:bg-gray-900
              border border-gray-200
              dark:border-gray-800
              rounded-2xl overflow-hidden"
          >
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b
                    border-gray-200
                    dark:border-gray-800
                    bg-gray-50 dark:bg-gray-800/50"
                >
                  <th
                    className="text-left px-6 py-3
                      font-semibold text-gray-700
                      dark:text-gray-300"
                  >
                    {isKo ? "플랜" : "Plan"}
                  </th>
                  <th
                    className="text-left px-6 py-3
                      font-semibold text-gray-700
                      dark:text-gray-300"
                  >
                    {isKo ? "요청/분" : "Requests/min"}
                  </th>
                  <th
                    className="text-left px-6 py-3
                      font-semibold text-gray-700
                      dark:text-gray-300"
                  >
                    {isKo
                      ? "영상 생성/일"
                      : "Videos/day"}
                  </th>
                  <th
                    className="text-left px-6 py-3
                      font-semibold text-gray-700
                      dark:text-gray-300
                      hidden sm:table-cell"
                  >
                    {isKo
                      ? "동시 요청"
                      : "Concurrency"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    plan: "Free",
                    rpm: "60",
                    vpd: "10",
                    conc: "2",
                  },
                  {
                    plan: "Pro",
                    rpm: "300",
                    vpd: "100",
                    conc: "10",
                  },
                  {
                    plan: "Enterprise",
                    rpm: isKo
                      ? "무제한"
                      : "Unlimited",
                    vpd: isKo
                      ? "무제한"
                      : "Unlimited",
                    conc: "50+",
                  },
                ].map((row) => (
                  <tr
                    key={row.plan}
                    className="border-b last:border-b-0
                      border-gray-100
                      dark:border-gray-800/50"
                  >
                    <td
                      className="px-6 py-4
                        font-medium text-gray-900
                        dark:text-white"
                    >
                      {row.plan}
                    </td>
                    <td
                      className="px-6 py-4
                        text-gray-600
                        dark:text-gray-400"
                    >
                      {row.rpm}
                    </td>
                    <td
                      className="px-6 py-4
                        text-gray-600
                        dark:text-gray-400"
                    >
                      {row.vpd}
                    </td>
                    <td
                      className="px-6 py-4
                        text-gray-600
                        dark:text-gray-400
                        hidden sm:table-cell"
                    >
                      {row.conc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-24">
        <div
          className="max-w-[1200px] mx-auto px-6
            text-center"
        >
          <div
            className="bg-white dark:bg-gray-900
              border border-gray-200
              dark:border-gray-800
              rounded-2xl p-10"
          >
            <div
              className="w-14 h-14 rounded-2xl
                flex items-center justify-center
                mx-auto mb-4"
              style={{
                backgroundColor:
                  colors.primary + "15",
              }}
            >
              <FileJson
                className="w-7 h-7"
                style={{ color: colors.primary }}
              />
            </div>

            <h2
              className="text-2xl font-bold
                text-gray-900 dark:text-white mb-2"
            >
              {isKo
                ? "지금 바로 시작하세요"
                : "Start Building Now"}
            </h2>

            <p
              className="text-gray-600
                dark:text-gray-400 mb-6
                max-w-lg mx-auto"
            >
              {isKo
                ? "무료 API 키를 발급받고 첫 AI 영상을 생성해보세요."
                : "Get your free API key and create your first AI video."}
            </p>

            <a
              href="/pricing"
              className="inline-flex items-center
                gap-2 px-6 py-3 rounded-xl
                font-medium text-white
                transition hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isKo
                ? "API 키 발급받기"
                : "Get API Key"}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
