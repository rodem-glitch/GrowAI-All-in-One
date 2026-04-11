"use client";

import { useState } from "react";
import {
  Briefcase,
  Clock,
  TrendingUp,
  Heart,
  Gem,
  MapPin,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

/* ── 부서 필터 ── */
type Department =
  | "All"
  | "Engineering"
  | "Design"
  | "Business";

const departments: Department[] = [
  "All",
  "Engineering",
  "Design",
  "Business",
];

/* ── 채용 공고 데이터 ── */
interface JobListing {
  id: number;
  titleKo: string;
  titleEn: string;
  department: Exclude<Department, "All">;
  locationKo: string;
  locationEn: string;
  typeKo: string;
  typeEn: string;
  descriptionKo: string;
  descriptionEn: string;
}

const jobs: JobListing[] = [
  {
    id: 1,
    titleKo: "AI 서비스 기획 우수한 경영지원 포지션",
    titleEn: "AI Service Planning & Business Support",
    department: "Business",
    locationKo: "경기 화성시",
    locationEn: "Hwaseong, Gyeonggi",
    typeKo: "신입/경력 | 유연근무",
    typeEn: "Entry/Experienced | Flexible",
    descriptionKo:
      "AI 서비스 기획 및 경영지원 업무를 담당합니다. " +
      "컨설팅/연구/조사, 경영/비즈니스 기획, 웹기획, " +
      "UI/UX 디자인 역량을 갖춘 분을 찾습니다. " +
      "마감: 05/11(월)",
    descriptionEn:
      "AI service planning and business support. " +
      "Consulting, business planning, web planning, " +
      "and UI/UX design skills required. " +
      "Deadline: May 11",
  },
  {
    id: 2,
    titleKo: "AI기반 웹 서비스 풀스택 크리에이터",
    titleEn: "AI Web Service Full-stack Creator",
    department: "Engineering",
    locationKo: "경기 화성시",
    locationEn: "Hwaseong, Gyeonggi",
    typeKo: "신입/경력 | 유연근무",
    typeEn: "Entry/Experienced | Flexible",
    descriptionKo:
      "기획에서 개발, 배포, 운영까지 풀스택으로 " +
      "AI 기반 웹 서비스를 구축합니다. " +
      "컨설팅/연구/조사, 웹기획, 웹개발, " +
      "UI/UX 디자인 역량 필요. 마감: 05/10(일)",
    descriptionEn:
      "Build AI web services end-to-end: " +
      "from planning to development, deployment, " +
      "and operations. Web dev and UI/UX skills " +
      "required. Deadline: May 10",
  },
  {
    id: 3,
    titleKo: "UIUX 디자인 우수 AI 기반 웹 서비스 기획 크리에이터",
    titleEn: "UI/UX Design AI Web Service Planner",
    department: "Design",
    locationKo: "경기 화성시",
    locationEn: "Hwaseong, Gyeonggi",
    typeKo: "경력무관 | 유연근무",
    typeEn: "All Levels | Flexible",
    descriptionKo:
      "AI 기반 웹 서비스의 기획 및 UIUX 디자인을 " +
      "담당합니다. 컨설팅/연구/조사, 웹기획, " +
      "웹퍼블리싱, UI/UX 디자인 역량 필요. " +
      "마감: 05/02(토)",
    descriptionEn:
      "Plan and design UI/UX for AI web services. " +
      "Consulting, web planning, web publishing, " +
      "and UI/UX design skills required. " +
      "Deadline: May 2",
  },
  {
    id: 4,
    titleKo: "AI HRD 컨설팅 크리에이터 포지션",
    titleEn: "AI HRD Consulting Creator",
    department: "Business",
    locationKo: "경기 화성시",
    locationEn: "Hwaseong, Gyeonggi",
    typeKo: "경력무관 | 유연근무",
    typeEn: "All Levels | Flexible",
    descriptionKo:
      "AI 기반 HRD 컨설팅 및 교육 콘텐츠 " +
      "기획/개발을 담당합니다. 컨설팅/연구/조사, " +
      "HRD/HRM, 그래픽디자인, 교재개발/교수설계 " +
      "역량 필요. 마감: 05/02(토)",
    descriptionEn:
      "AI-based HRD consulting and educational " +
      "content planning/development. Consulting, " +
      "HRD/HRM, graphic design, instructional " +
      "design skills required. Deadline: May 2",
  },
  {
    id: 5,
    titleKo: "에듀테크분야 정부지원 사업, 공공 수주 영업 및 제안",
    titleEn: "EdTech Public Sector Sales & Proposals",
    department: "Business",
    locationKo: "경기 화성시",
    locationEn: "Hwaseong, Gyeonggi",
    typeKo: "경력 | 유연근무",
    typeEn: "Experienced | Flexible",
    descriptionKo:
      "에듀테크 분야 정부지원 사업 및 공공 수주 " +
      "영업/제안을 담당합니다. 컨설팅/연구/조사, " +
      "웹기획, PL/PM/PO, IT/기술영업 역량 필요.",
    descriptionEn:
      "Government-funded EdTech project sales " +
      "and public sector proposals. Consulting, " +
      "web planning, PM/PO, IT sales skills " +
      "required.",
  },
];

/* ── 복리후생 데이터 ── */
interface Benefit {
  icon: typeof Clock;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
}

const benefits: Benefit[] = [
  {
    icon: Clock,
    titleKo: "나다운 속도로 일하기",
    titleEn: "Work at Your Own Pace",
    descKo:
      "출퇴근 시간은 자유, 일하는 장소도 자유. " +
      "가장 좋은 아이디어는 가장 편안한 순간에 옵니다.",
    descEn:
      "Flexible hours, flexible place. " +
      "The best ideas come when you're comfortable.",
  },
  {
    icon: TrendingUp,
    titleKo: "배움에 끝은 없으니까",
    titleEn: "Never Stop Learning",
    descKo:
      "컨퍼런스, 도서, 온라인 강의. " +
      "성장에 필요한 모든 비용을 지원합니다.",
    descEn:
      "Conferences, books, courses. " +
      "We invest in everything you need to grow.",
  },
  {
    icon: Heart,
    titleKo: "건강해야 오래 달립니다",
    titleEn: "Stay Healthy, Run Far",
    descKo:
      "건강검진, 피트니스, 심리 상담까지. " +
      "몸과 마음 모두 챙기는 팀입니다.",
    descEn:
      "Checkups, fitness, counseling. " +
      "A team that cares for body and mind.",
  },
  {
    icon: Gem,
    titleKo: "함께 만든 성장, 함께 나누기",
    titleEn: "Share What We Build Together",
    descKo:
      "모든 멤버에게 스톡옵션을 부여합니다. " +
      "우리가 만든 가치는 우리 모두의 것입니다.",
    descEn:
      "Stock options for every member. " +
      "The value we create belongs to all of us.",
  },
];

/* ── 문화 카드 데이터 ── */
interface CultureValue {
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
}

const cultureValues: CultureValue[] = [
  {
    titleKo: "스스로 결정하고, 끝까지 책임지기",
    titleEn: "Decide Yourself, Own the Outcome",
    descKo:
      "지시를 기다리지 않습니다. " +
      "방향을 정하고, 실행하고, 결과로 말합니다. " +
      "신뢰가 우리의 유일한 관리 도구입니다.",
    descEn:
      "We don't wait for orders. " +
      "Set the direction, execute, let results speak. " +
      "Trust is our only management tool.",
  },
  {
    titleKo: "완벽보다 빠르게, 실패보다 배우기",
    titleEn: "Move Fast, Learn Faster",
    descKo:
      "100%의 계획보다 70%의 실행이 낫습니다. " +
      "실패는 부끄러운 게 아니라, " +
      "다음에 더 잘하기 위한 연료입니다.",
    descEn:
      "70% execution beats 100% planning. " +
      "Failure isn't shameful, " +
      "it's fuel for doing better next time.",
  },
  {
    titleKo: "솔직함이 가장 빠른 길입니다",
    titleEn: "Honesty Is the Shortest Path",
    descKo:
      "좋은 말만 하는 조직은 성장하지 못합니다. " +
      "누구나 말할 수 있고, 누구든 들을 준비가 " +
      "되어 있는 팀입니다.",
    descEn:
      "A team that only says nice things can't grow. " +
      "Everyone can speak up, " +
      "and everyone is ready to listen.",
  },
];

/* ── 부서별 태그 색상 ── */
function deptColor(dept: string): string {
  switch (dept) {
    case "Engineering":
      return "bg-blue-100 text-blue-700 " +
        "dark:bg-blue-900/30 dark:text-blue-300";
    case "Design":
      return "bg-purple-100 text-purple-700 " +
        "dark:bg-purple-900/30 dark:text-purple-300";
    case "Business":
      return "bg-orange-100 text-orange-700 " +
        "dark:bg-orange-900/30 dark:text-orange-300";
    default:
      return "bg-gray-100 text-gray-700 " +
        "dark:bg-gray-800 dark:text-gray-300";
  }
}

/* ── 메인 컴포넌트 ── */
export default function CareersContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const [activeFilter, setActiveFilter] =
    useState<Department>("All");
  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? jobs
    : jobs.filter((j) => j.department === activeFilter);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className={
              "inline-flex items-center justify-center " +
              "w-16 h-16 rounded-2xl mb-6"
            }
            style={{
              backgroundColor: colors.primary + "15",
            }}
          >
            <Briefcase
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>
          <h1
            className={
              "text-4xl md:text-5xl font-bold " +
              "text-gray-900 dark:text-white mb-4"
            }
          >
            {isKo
              ? "아직 세상에 없는 것을, 함께 만듭니다"
              : "We Create What Doesn't Exist Yet"}
          </h1>
          <p
            className={
              "text-lg text-gray-600 " +
              "dark:text-gray-400 max-w-2xl mx-auto"
            }
          >
            {isKo
              ? "누군가의 상상이 현실이 되는 순간, " +
                "그 옆에는 늘 동료가 있었습니다. " +
                "당신이 그 다음 동료가 되어주세요."
              : "Every time imagination became reality, " +
                "a teammate was right there. " +
                "Be the next one."}
          </p>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className={
              "text-2xl md:text-3xl font-bold " +
              "text-gray-900 dark:text-white " +
              "text-center mb-12"
            }
          >
            {isKo ? "복리후생" : "Benefits"}
          </h2>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 " +
              "lg:grid-cols-4 gap-6"
            }
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.titleEn}
                  className={
                    "bg-white dark:bg-gray-900 " +
                    "border border-gray-200 " +
                    "dark:border-gray-800 " +
                    "rounded-xl p-6 text-center"
                  }
                >
                  <div
                    className={
                      "inline-flex items-center " +
                      "justify-center w-12 h-12 " +
                      "rounded-xl mb-4"
                    }
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
                    className={
                      "text-lg font-semibold " +
                      "text-gray-900 dark:text-white " +
                      "mb-2"
                    }
                  >
                    {isKo ? b.titleKo : b.titleEn}
                  </h3>
                  <p
                    className={
                      "text-sm text-gray-600 " +
                      "dark:text-gray-400"
                    }
                  >
                    {isKo ? b.descKo : b.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className={
              "text-2xl md:text-3xl font-bold " +
              "text-gray-900 dark:text-white " +
              "text-center mb-8"
            }
          >
            {isKo ? "채용 중인 포지션" : "Open Positions"}
          </h2>

          {/* 부서 필터 탭 */}
          <div
            className={
              "flex flex-wrap justify-center " +
              "gap-2 mb-8"
            }
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={
                  "text-sm px-4 py-2 rounded-full " +
                  "font-medium transition-colors " +
                  (activeFilter === dept
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 " +
                      "bg-gray-100 dark:bg-gray-800 " +
                      "hover:bg-gray-200 " +
                      "dark:hover:bg-gray-700")
                }
                style={
                  activeFilter === dept
                    ? {
                        backgroundColor:
                          colors.primary,
                      }
                    : undefined
                }
              >
                {dept === "All"
                  ? isKo
                    ? "전체"
                    : "All"
                  : dept}
              </button>
            ))}
          </div>

          {/* 공고 리스트 */}
          <div className="space-y-4">
            {filtered.map((job) => {
              const isExpanded =
                expandedId === job.id;
              return (
                <div
                  key={job.id}
                  className={
                    "bg-white dark:bg-gray-900 " +
                    "border rounded-xl p-5 " +
                    "transition-colors " +
                    (isExpanded
                      ? "border-gray-300 " +
                        "dark:border-gray-800"
                      : "border-gray-200 " +
                        "dark:border-gray-800 " +
                        "hover:border-gray-300 " +
                        "dark:hover:border-gray-700")
                  }
                >
                  <div
                    className={
                      "flex items-start " +
                      "justify-between gap-4"
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className={
                          "text-lg font-semibold " +
                          "text-gray-900 " +
                          "dark:text-white mb-2"
                        }
                      >
                        {isKo
                          ? job.titleKo
                          : job.titleEn}
                      </h3>
                      <div
                        className={
                          "flex flex-wrap " +
                          "items-center gap-2"
                        }
                      >
                        <span
                          className={
                            "text-xs px-2.5 py-1 " +
                            "rounded-full " +
                            deptColor(job.department)
                          }
                        >
                          {job.department}
                        </span>
                        <span
                          className={
                            "flex items-center " +
                            "gap-1 text-xs " +
                            "text-gray-500 " +
                            "dark:text-gray-400"
                          }
                        >
                          <MapPin className="w-3 h-3" />
                          {isKo
                            ? job.locationKo
                            : job.locationEn}
                        </span>
                        <span
                          className={
                            "flex items-center " +
                            "gap-1 text-xs " +
                            "text-gray-500 " +
                            "dark:text-gray-400"
                          }
                        >
                          <Building2
                            className="w-3 h-3"
                          />
                          {isKo
                            ? job.typeKo
                            : job.typeEn}
                        </span>
                      </div>
                    </div>
                    <div
                      className={
                        "flex items-center gap-2 " +
                        "shrink-0"
                      }
                    >
                      <button
                        className={
                          "text-sm font-medium " +
                          "hover:underline"
                        }
                        style={{
                          color: colors.primary,
                        }}
                      >
                        {isKo ? "지원하기" : "Apply"}
                      </button>
                      <button
                        onClick={() =>
                          setExpandedId(
                            isExpanded
                              ? null
                              : job.id,
                          )
                        }
                        className={
                          "p-1 text-gray-400 " +
                          "hover:text-gray-600 " +
                          "dark:hover:text-gray-300 " +
                          "transition-transform " +
                          (isExpanded
                            ? "rotate-180"
                            : "")
                        }
                      >
                        <ChevronDown
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </div>

                  {/* 확장된 설명 */}
                  {isExpanded && (
                    <p
                      className={
                        "mt-4 pt-4 text-sm " +
                        "text-gray-600 " +
                        "dark:text-gray-400 " +
                        "border-t border-gray-100 " +
                        "dark:border-gray-800"
                      }
                    >
                      {isKo
                        ? job.descriptionKo
                        : job.descriptionEn}
                    </p>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <p
                className={
                  "text-center text-gray-500 " +
                  "dark:text-gray-400 py-8"
                }
              >
                {isKo
                  ? "해당 부서에 열린 포지션이 없습니다."
                  : "No open positions in this " +
                    "department."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Culture ── */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className={
              "text-2xl md:text-3xl font-bold " +
              "text-gray-900 dark:text-white " +
              "text-center mb-12"
            }
          >
            {isKo ? "우리의 문화" : "Our Culture"}
          </h2>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-3 gap-6"
            }
          >
            {cultureValues.map((v) => (
              <div
                key={v.titleEn}
                className={
                  "bg-white dark:bg-gray-900 " +
                  "border border-gray-200 " +
                  "dark:border-gray-800 " +
                  "rounded-xl p-6"
                }
              >
                <h3
                  className={
                    "text-lg font-semibold " +
                    "text-gray-900 dark:text-white " +
                    "mb-3"
                  }
                >
                  {isKo ? v.titleKo : v.titleEn}
                </h3>
                <p
                  className={
                    "text-sm text-gray-600 " +
                    "dark:text-gray-400 leading-relaxed"
                  }
                >
                  {isKo ? v.descKo : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 pb-24">
        <div
          className={
            "max-w-[1200px] mx-auto px-6 " +
            "text-center"
          }
        >
          <h2
            className={
              "text-2xl font-bold text-gray-900 " +
              "dark:text-white mb-4"
            }
          >
            {isKo
              ? "딱 맞는 자리가 아직 없다면"
              : "If Your Role Isn't Here Yet"}
          </h2>
          <p
            className={
              "text-gray-600 dark:text-gray-400 " +
              "mb-6"
            }
          >
            {isKo
              ? "좋은 사람이 먼저이고, 자리는 그 다음입니다. " +
                "당신의 이야기를 들려주세요."
              : "Great people come first, roles come second. " +
                "Tell us your story."}
          </p>
          <a
            href="mailto:careers@newkl.com"
            className={
              "inline-flex items-center gap-2 " +
              "text-white font-medium px-6 py-3 " +
              "rounded-xl transition-opacity " +
              "hover:opacity-90"
            }
            style={{
              backgroundColor: colors.primary,
            }}
          >
            {isKo
              ? "이메일로 지원하기"
              : "Apply via Email"}
          </a>
        </div>
      </section>
    </div>
  );
}
