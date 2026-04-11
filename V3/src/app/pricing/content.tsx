"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

/* ── 요금제 데이터 ── */
interface Plan {
  nameKo: string;
  nameEn: string;
  monthly: number;
  annual: number;
  features: { ko: string; en: string }[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    nameKo: "Free",
    nameEn: "Free",
    monthly: 0,
    annual: 0,
    features: [
      {
        ko: "120분 음성 변환",
        en: "120 min transcription",
      },
      {
        ko: "10,000자 AI 음성",
        en: "10K AI voice characters",
      },
      {
        ko: "720p 영상 품질",
        en: "720p video quality",
      },
      {
        ko: "워터마크 포함",
        en: "Watermark included",
      },
    ],
  },
  {
    nameKo: "Light",
    nameEn: "Light",
    monthly: 15000,
    annual: 12000,
    features: [
      {
        ko: "600분 음성 변환",
        en: "600 min transcription",
      },
      {
        ko: "50,000자 AI 음성",
        en: "50K AI voice characters",
      },
      {
        ko: "1080p 영상 품질",
        en: "1080p video quality",
      },
      {
        ko: "워터마크 없음",
        en: "No watermark",
      },
      {
        ko: "5GB 클라우드 저장소",
        en: "5GB cloud storage",
      },
    ],
  },
  {
    nameKo: "Standard",
    nameEn: "Standard",
    monthly: 35000,
    annual: 28000,
    recommended: true,
    features: [
      {
        ko: "2,000분 음성 변환",
        en: "2,000 min transcription",
      },
      {
        ko: "200,000자 AI 음성",
        en: "200K AI voice characters",
      },
      {
        ko: "4K 영상 품질",
        en: "4K video quality",
      },
      {
        ko: "50GB 클라우드 저장소",
        en: "50GB cloud storage",
      },
      {
        ko: "우선 지원",
        en: "Priority support",
      },
    ],
  },
  {
    nameKo: "Business",
    nameEn: "Business",
    monthly: 89000,
    annual: 71200,
    features: [
      {
        ko: "무제한 음성 변환",
        en: "Unlimited transcription",
      },
      {
        ko: "500,000자 AI 음성",
        en: "500K AI voice characters",
      },
      {
        ko: "4K 영상 품질",
        en: "4K video quality",
      },
      {
        ko: "200GB 클라우드 저장소",
        en: "200GB cloud storage",
      },
      {
        ko: "팀 협업 기능",
        en: "Team collaboration",
      },
      {
        ko: "커스텀 브랜딩",
        en: "Custom branding",
      },
      {
        ko: "전담 지원",
        en: "Dedicated support",
      },
    ],
  },
];

/* ── FAQ 데이터 ── */
interface Faq {
  qKo: string;
  qEn: string;
  aKo: string;
  aEn: string;
}

const faqs: Faq[] = [
  {
    qKo: "무료 플랜에서 유료 플랜으로 업그레이드하면?",
    qEn: "What happens when I upgrade from Free?",
    aKo: "기존 데이터는 그대로 유지되며, 결제 즉시"
      + " 상위 플랜의 모든 기능을 이용할 수 있습니다.",
    aEn: "Your data stays intact and you get"
      + " immediate access to all upgraded features.",
  },
  {
    qKo: "연간 결제 시 할인율은 얼마인가요?",
    qEn: "How much is the annual discount?",
    aKo: "연간 결제 시 월간 대비 약 20% 할인된"
      + " 가격이 적용됩니다.",
    aEn: "Annual billing gives you approximately"
      + " 20% off the monthly price.",
  },
  {
    qKo: "팀원 추가 시 추가 비용이 발생하나요?",
    qEn: "Are there extra costs for adding team members?",
    aKo: "Business 플랜에서는 기본 5명까지 포함이며,"
      + " 추가 인원은 1인당 월 ₩15,000입니다.",
    aEn: "Business plan includes 5 seats. Additional"
      + " members are ₩15,000/mo each.",
  },
  {
    qKo: "환불 정책은 어떻게 되나요?",
    qEn: "What is your refund policy?",
    aKo: "구독 시작 후 14일 이내 전액 환불이"
      + " 가능합니다. 이후에는 남은 기간에 대한"
      + " 비례 환불이 적용됩니다.",
    aEn: "Full refund within 14 days. After that,"
      + " prorated refunds apply for the remaining"
      + " period.",
  },
  {
    qKo: "엔터프라이즈 플랜은 어떻게 문의하나요?",
    qEn: "How do I inquire about Enterprise plans?",
    aKo: "하단의 '문의하기' 버튼을 통해 영업팀에"
      + " 직접 연락하실 수 있습니다.",
    aEn: "Use the 'Contact us' button below to"
      + " reach our sales team directly.",
  },
];

/* ── 가격 포맷 유틸 ── */
function formatPrice(
  price: number,
  isKo: boolean,
): string {
  if (price === 0) return isKo ? "₩0" : "₩0";
  return `₩${price.toLocaleString()}`;
}

/* ── 메인 컴포넌트 ── */
export default function PricingContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<
    number | null
  >(null);

  return (
    <div className="bg-white dark:bg-gray-950 pt-24">
      {/* ── Hero ── */}
      <section className="text-center py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1
            className={
              "text-4xl md:text-5xl font-bold"
              + " text-gray-900 dark:text-white mb-4"
            }
          >
            {isKo
              ? "모든 분을 위한 요금제"
              : "Plans for everyone"}
          </h1>
          <p
            className={
              "text-lg text-gray-600"
              + " dark:text-gray-400 max-w-2xl mx-auto"
            }
          >
            {isKo
              ? "무료부터 엔터프라이즈까지,"
                + " 필요에 맞는 플랜을 선택하세요."
              : "From free to enterprise,"
                + " pick the plan that fits your needs."}
          </p>
        </div>
      </section>

      {/* ── 월간/연간 토글 ── */}
      <section className="text-center pb-12">
        <div
          className={
            "inline-flex items-center gap-3"
            + " bg-gray-100 dark:bg-gray-800"
            + " rounded-full p-1"
          }
        >
          <button
            onClick={() => setAnnual(false)}
            className={
              "px-5 py-2 rounded-full text-sm"
              + " font-medium transition-colors"
              + (
                !annual
                  ? " bg-white dark:bg-gray-700"
                    + " text-gray-900 dark:text-white"
                    + " shadow-sm"
                  : " text-gray-600"
                    + " dark:text-gray-400"
              )
            }
          >
            {isKo ? "월간" : "Monthly"}
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={
              "px-5 py-2 rounded-full text-sm"
              + " font-medium transition-colors"
              + (
                annual
                  ? " bg-white dark:bg-gray-700"
                    + " text-gray-900 dark:text-white"
                    + " shadow-sm"
                  : " text-gray-600"
                    + " dark:text-gray-400"
              )
            }
          >
            {isKo ? "연간" : "Annual"}
            <span
              className="ml-1 text-xs"
              style={{ color: colors.primary }}
            >
              -20%
            </span>
          </button>
        </div>
      </section>

      {/* ── 요금제 카드 그리드 ── */}
      <section className="pb-20">
        <div
          className={
            "max-w-[1200px] mx-auto px-6"
            + " grid grid-cols-1 md:grid-cols-2"
            + " lg:grid-cols-4 gap-6"
          }
        >
          {plans.map((plan) => {
            const price = annual
              ? plan.annual
              : plan.monthly;
            const name = isKo
              ? plan.nameKo
              : plan.nameEn;

            return (
              <div
                key={plan.nameEn}
                className={
                  "relative rounded-2xl border"
                  + " p-6 flex flex-col"
                  + " bg-white dark:bg-gray-900"
                  + (
                    plan.recommended
                      ? ""
                      : " border-gray-200"
                        + " dark:border-gray-800"
                  )
                }
                style={
                  plan.recommended
                    ? {
                        borderColor: colors.primary,
                        borderWidth: 2,
                      }
                    : undefined
                }
              >
                {/* 추천 뱃지 */}
                {plan.recommended && (
                  <span
                    className={
                      "absolute -top-3 left-1/2"
                      + " -translate-x-1/2 text-xs"
                      + " font-semibold text-white"
                      + " px-3 py-1 rounded-full"
                    }
                    style={{
                      backgroundColor:
                        colors.primary,
                    }}
                  >
                    {isKo ? "추천" : "Recommended"}
                  </span>
                )}

                {/* 플랜명 */}
                <h3
                  className={
                    "text-lg font-semibold"
                    + " text-gray-900"
                    + " dark:text-white mb-2"
                  }
                >
                  {name}
                </h3>

                {/* 가격 */}
                <div className="mb-6">
                  <span
                    className={
                      "text-3xl font-bold"
                      + " text-gray-900"
                      + " dark:text-white"
                    }
                  >
                    {formatPrice(price, isKo)}
                  </span>
                  {price > 0 && (
                    <span
                      className={
                        "text-sm text-gray-500"
                        + " dark:text-gray-400 ml-1"
                      }
                    >
                      /{isKo ? "월" : "mo"}
                    </span>
                  )}
                </div>

                {/* 기능 체크리스트 */}
                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 shrink-0"
                        style={{
                          color: colors.primary,
                        }}
                      />
                      <span
                        className={
                          "text-sm text-gray-700"
                          + " dark:text-gray-300"
                        }
                      >
                        {isKo ? f.ko : f.en}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA 버튼 */}
                <button
                  className={
                    "w-full py-2.5 rounded-lg"
                    + " text-sm font-semibold"
                    + " transition-opacity"
                    + " hover:opacity-90"
                  }
                  style={
                    plan.recommended
                      ? {
                          backgroundColor:
                            colors.primary,
                          color: "#fff",
                        }
                      : {
                          border: `1.5px solid ${colors.primary}`,
                          color: colors.primary,
                        }
                  }
                >
                  {price === 0
                    ? isKo
                      ? "무료로 시작"
                      : "Start free"
                    : isKo
                      ? "시작하기"
                      : "Get started"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Enterprise CTA ── */}
      <section
        className={
          "py-16 bg-gray-50 dark:bg-gray-900"
        }
      >
        <div
          className={
            "max-w-[1200px] mx-auto px-6"
            + " text-center"
          }
        >
          <h2
            className={
              "text-2xl md:text-3xl font-bold"
              + " text-gray-900 dark:text-white"
              + " mb-4"
            }
          >
            {isKo
              ? "더 큰 규모가 필요하신가요?"
              : "Need a bigger scale?"}
          </h2>
          <p
            className={
              "text-gray-600 dark:text-gray-400"
              + " mb-8 max-w-xl mx-auto"
            }
          >
            {isKo
              ? "맞춤형 엔터프라이즈 플랜으로"
                + " 대규모 팀과 조직에 최적화된"
                + " 솔루션을 제공합니다."
              : "Our Enterprise plan offers"
                + " tailored solutions optimized"
                + " for large teams and orgs."}
          </p>
          <button
            className={
              "px-8 py-3 rounded-lg text-white"
              + " font-semibold transition-opacity"
              + " hover:opacity-90"
            }
            style={{
              backgroundColor: colors.primary,
            }}
          >
            {isKo ? "문의하기" : "Contact us"}
          </button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className={
              "text-2xl md:text-3xl font-bold"
              + " text-gray-900 dark:text-white"
              + " text-center mb-12"
            }
          >
            {isKo
              ? "자주 묻는 질문"
              : "Frequently Asked Questions"}
          </h2>

          <div
            className={
              "max-w-2xl mx-auto divide-y"
              + " divide-gray-200"
              + " dark:divide-gray-800"
            }
          >
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : idx,
                      )
                    }
                    className={
                      "w-full flex items-center"
                      + " justify-between text-left"
                      + " gap-4"
                    }
                  >
                    <span
                      className={
                        "font-medium"
                        + " text-gray-900"
                        + " dark:text-white"
                      }
                    >
                      {isKo ? faq.qKo : faq.qEn}
                    </span>
                    <ChevronDown
                      className={
                        "w-5 h-5 shrink-0"
                        + " text-gray-500"
                        + " transition-transform"
                        + (
                          isOpen
                            ? " rotate-180"
                            : ""
                        )
                      }
                    />
                  </button>
                  {isOpen && (
                    <p
                      className={
                        "mt-3 text-sm"
                        + " text-gray-600"
                        + " dark:text-gray-400"
                      }
                    >
                      {isKo ? faq.aKo : faq.aEn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
