"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CreditCard,
  Send,
  Search,
  CheckCircle,
  ChevronDown,
  Mail,
  ArrowRight,
} from "lucide-react";

/* ── FAQ 데이터 ── */
interface FaqItem {
  qKo: string;
  qEn: string;
  aKo: string;
  aEn: string;
}

const faqs: FaqItem[] = [
  {
    qKo: "환불은 얼마나 걸리나요?",
    qEn: "How long does a refund take?",
    aKo:
      "환불 요청 승인 후 영업일 기준 5~7일 이내에 " +
      "원래 결제 수단으로 환불됩니다. 카드사 사정에 " +
      "따라 최대 10일까지 소요될 수 있습니다.",
    aEn:
      "Refunds are processed within 5-7 business " +
      "days after approval, returned to your " +
      "original payment method. It may take up " +
      "to 10 days depending on your card issuer.",
  },
  {
    qKo: "연간 구독도 환불 가능한가요?",
    qEn: "Can I refund annual subscriptions?",
    aKo:
      "네, 연간 구독도 구매 후 14일 이내이고 " +
      "사용량이 50% 미만인 경우 환불이 가능합니다. " +
      "14일 이후에는 잔여 기간에 대한 부분 환불이 " +
      "적용됩니다.",
    aEn:
      "Yes, annual subscriptions are eligible " +
      "for a full refund within 14 days if usage " +
      "is under 50%. After 14 days, a pro-rata " +
      "partial refund applies for the remaining " +
      "period.",
  },
  {
    qKo: "부분 사용한 경우 환불 금액은?",
    qEn: "How is partial usage calculated?",
    aKo:
      "부분 환불 금액은 전체 구독 기간 대비 " +
      "남은 기간의 비율로 계산됩니다. 예를 들어, " +
      "월간 구독 15일 사용 시 약 50%가 환불됩니다. " +
      "이미 사용한 크레딧은 차감됩니다.",
    aEn:
      "Partial refunds are calculated pro-rata " +
      "based on the remaining subscription " +
      "period. For example, 15 days used on a " +
      "monthly plan results in roughly 50% " +
      "refund. Consumed credits are deducted.",
  },
];

/* ── 프로세스 스텝 데이터 ── */
interface ProcessStep {
  icon: typeof Send;
  labelKo: string;
  labelEn: string;
  descKo: string;
  descEn: string;
}

const steps: ProcessStep[] = [
  {
    icon: Send,
    labelKo: "환불 요청",
    labelEn: "Submit Request",
    descKo: "이메일 또는 고객센터로 요청",
    descEn: "Via email or help center",
  },
  {
    icon: Search,
    labelKo: "검토",
    labelEn: "Review",
    descKo: "영업일 기준 1~2일 소요",
    descEn: "1-2 business days",
  },
  {
    icon: CheckCircle,
    labelKo: "환불 처리",
    labelEn: "Refund",
    descKo: "영업일 기준 5~7일 이내",
    descEn: "Within 5-7 business days",
  },
];

/* ── 정책 섹션 데이터 ── */
interface PolicySection {
  titleKo: string;
  titleEn: string;
  contentKo: string[];
  contentEn: string[];
}

const policySections: PolicySection[] = [
  {
    titleKo: "1. 환불 대상",
    titleEn: "1. Eligible for Refund",
    contentKo: [
      "모든 유료 구독 플랜(Starter, Pro, Enterprise)" +
        "은 구매일로부터 14일 이내에 환불을 요청할 " +
        "수 있습니다.",
      "환불 요청 시점까지의 서비스 사용량이 전체 " +
        "제공량의 50% 미만이어야 합니다.",
      "첫 결제 시에만 전액 환불이 적용되며, " +
        "갱신 결제의 경우 부분 환불이 적용됩니다.",
    ],
    contentEn: [
      "All paid subscription plans (Starter, " +
        "Pro, Enterprise) are eligible for a " +
        "refund within 14 days of purchase.",
      "Service usage must be under 50% of the " +
        "total allocation at the time of the " +
        "refund request.",
      "Full refunds apply only to the first " +
        "payment. Renewal payments are subject " +
        "to partial refunds.",
    ],
  },
  {
    titleKo: "2. 환불 불가 항목",
    titleEn: "2. Non-Refundable",
    contentKo: [
      "추가 크레딧 팩, 애드온 구매는 환불 " +
        "대상에서 제외됩니다.",
      "이미 소비된 AI 생성 크레딧(영상, 이미지, " +
        "음성 등)은 환불되지 않습니다.",
      "프로모션 또는 할인 코드로 구매한 항목은 " +
        "별도 정책이 적용됩니다.",
    ],
    contentEn: [
      "Additional credit packs and add-on " +
        "purchases are non-refundable.",
      "Already consumed AI generation credits " +
        "(video, image, voice, etc.) cannot " +
        "be refunded.",
      "Items purchased with promotional or " +
        "discount codes are subject to " +
        "separate policies.",
    ],
  },
  {
    titleKo: "3. 환불 절차",
    titleEn: "3. Refund Process",
    contentKo: [
      "help@newkl.net으로 환불 요청 이메일을 " +
        "보내주세요. 계정 이메일, 구독 플랜, " +
        "환불 사유를 포함해 주세요.",
      "접수된 요청은 영업일 기준 1~2일 이내에 " +
        "검토됩니다.",
      "승인된 환불은 원래 결제 수단으로 " +
        "영업일 기준 5~7일 이내에 처리됩니다.",
    ],
    contentEn: [
      "Send a refund request email to " +
        "help@newkl.net. Include your account " +
        "email, subscription plan, and reason.",
      "Submitted requests are reviewed within " +
        "1-2 business days.",
      "Approved refunds are processed to the " +
        "original payment method within 5-7 " +
        "business days.",
    ],
  },
  {
    titleKo: "4. 부분 환불",
    titleEn: "4. Partial Refunds",
    contentKo: [
      "14일 이후 환불 요청 시, 잔여 구독 기간에 " +
        "비례한 부분 환불이 적용됩니다.",
      "부분 환불 금액 = 총 결제 금액 x " +
        "(잔여 일수 / 전체 구독 일수) - " +
        "소비된 크레딧 금액",
      "부분 환불은 최소 환불 금액(5,000원 / $5) " +
        "이상일 경우에만 처리됩니다.",
    ],
    contentEn: [
      "Refund requests after 14 days are " +
        "eligible for pro-rata partial refunds " +
        "based on the remaining subscription.",
      "Partial refund = Total paid x " +
        "(remaining days / total days) - " +
        "consumed credit value.",
      "Partial refunds are processed only " +
        "when the amount exceeds the minimum " +
        "threshold ($5 / 5,000 KRW).",
    ],
  },
  {
    titleKo: "5. 구독 취소",
    titleEn: "5. Subscription Cancellation",
    contentKo: [
      "구독 취소는 설정 > 구독 관리 페이지에서 " +
        "언제든 가능합니다.",
      "취소 후에도 현재 결제 주기가 끝날 때까지 " +
        "서비스를 이용할 수 있습니다.",
      "자동 갱신이 중지되며, 다음 결제일에 " +
        "요금이 청구되지 않습니다.",
    ],
    contentEn: [
      "You can cancel your subscription at " +
        "any time from Settings > Subscription " +
        "Management.",
      "After cancellation, you retain access " +
        "until the end of the current billing " +
        "cycle.",
      "Auto-renewal is stopped and no charges " +
        "will be made on the next billing date.",
    ],
  },
  {
    titleKo: "6. 예외 사항",
    titleEn: "6. Exceptions",
    contentKo: [
      "서비스 장애로 인해 정상적인 이용이 " +
        "불가능했던 경우, 기간에 관계없이 " +
        "전액 환불이 가능합니다.",
      "법적 요구 사항에 따른 환불은 " +
        "관련 법률이 우선 적용됩니다.",
      "특수한 사정이 있는 경우 " +
        "help@newkl.net으로 문의해 주시면 " +
        "개별 검토가 가능합니다.",
    ],
    contentEn: [
      "If the service was unavailable due to " +
        "outages, a full refund is available " +
        "regardless of the time period.",
      "Refunds required by law take precedence " +
        "over this policy.",
      "For special circumstances, contact " +
        "help@newkl.net for individual " +
        "case review.",
    ],
  },
];

/* ── 메인 컴포넌트 ── */
export default function RefundContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const [openFaq, setOpenFaq] = useState<
    number | null
  >(null);

  const isKo = locale === "ko";

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className={
              "mx-auto mb-6 flex h-16 w-16 " +
              "items-center justify-center rounded-2xl"
            }
            style={{
              backgroundColor: colors.primary + "18",
            }}
          >
            <CreditCard
              className="h-8 w-8"
              style={{ color: colors.primary }}
            />
          </div>
          <h1
            className={
              "text-4xl font-bold tracking-tight " +
              "text-gray-900 dark:text-white"
            }
          >
            {isKo ? "환불 정책" : "Refund Policy"}
          </h1>
          <p
            className={
              "mt-4 text-gray-500 " +
              "dark:text-gray-400"
            }
          >
            {isKo
              ? "최종 업데이트: 2026년 4월 1일"
              : "Last updated: April 1, 2026"}
          </p>
        </div>
      </section>

      {/* ── Quick Summary ── */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className={
              "bg-gray-50 dark:bg-gray-900 " +
              "border-l-4 rounded-r-xl p-6"
            }
            style={{
              borderLeftColor: colors.primary,
            }}
          >
            <h2
              className={
                "text-lg font-semibold mb-3 " +
                "text-gray-900 dark:text-white"
              }
            >
              {isKo ? "요약" : "Quick Summary"}
            </h2>
            <ul
              className={
                "space-y-2 text-gray-700 " +
                "dark:text-gray-300"
              }
            >
              <li className="flex items-start gap-2">
                <CheckCircle
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: colors.primary }}
                />
                <span>
                  {isKo
                    ? "구매 후 14일 이내 전액 환불 가능"
                    : "Full refund within 14 days " +
                      "of purchase"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: colors.primary }}
                />
                <span>
                  {isKo
                    ? "사용량 50% 미만일 경우 적용"
                    : "Applicable if less than " +
                      "50% usage"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Policy Content ── */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-10">
            {policySections.map((s, i) => (
              <div key={i}>
                <h3
                  className={
                    "text-xl font-semibold " +
                    "border-l-4 pl-4 mb-4 " +
                    "text-gray-900 dark:text-white"
                  }
                  style={{
                    borderColor: colors.primary,
                  }}
                >
                  {isKo ? s.titleKo : s.titleEn}
                </h3>
                <div
                  className={
                    "space-y-3 text-gray-700 " +
                    "dark:text-gray-300 " +
                    "leading-relaxed"
                  }
                >
                  {(isKo
                    ? s.contentKo
                    : s.contentEn
                  ).map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Refund Process Visual ── */}
      <section className="pb-16">
        <div
          className="max-w-[1200px] mx-auto px-6"
        >
          <h2
            className={
              "text-2xl font-bold text-center " +
              "mb-10 text-gray-900 dark:text-white"
            }
          >
            {isKo
              ? "환불 처리 과정"
              : "Refund Process"}
          </h2>
          <div
            className={
              "flex flex-col md:flex-row " +
              "items-center justify-center " +
              "gap-6 md:gap-4"
            }
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={
                    "flex flex-col md:flex-row " +
                    "items-center gap-4"
                  }
                >
                  {/* 스텝 카드 */}
                  <div
                    className={
                      "flex flex-col items-center " +
                      "text-center w-48"
                    }
                  >
                    <div
                      className={
                        "flex h-14 w-14 " +
                        "items-center " +
                        "justify-center " +
                        "rounded-full mb-3"
                      }
                      style={{
                        backgroundColor:
                          colors.primary + "18",
                      }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{
                          color: colors.primary,
                        }}
                      />
                    </div>
                    <p
                      className={
                        "font-semibold " +
                        "text-gray-900 " +
                        "dark:text-white"
                      }
                    >
                      {isKo
                        ? step.labelKo
                        : step.labelEn}
                    </p>
                    <p
                      className={
                        "text-sm text-gray-500 " +
                        "dark:text-gray-400 mt-1"
                      }
                    >
                      {isKo
                        ? step.descKo
                        : step.descEn}
                    </p>
                  </div>
                  {/* 화살표 (마지막 제외) */}
                  {i < steps.length - 1 && (
                    <ArrowRight
                      className={
                        "h-6 w-6 shrink-0 " +
                        "rotate-90 md:rotate-0"
                      }
                      style={{
                        color: colors.primary,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className={
              "text-2xl font-bold text-center " +
              "mb-8 text-gray-900 dark:text-white"
            }
          >
            {isKo
              ? "자주 묻는 질문"
              : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={
                    "border border-gray-200 " +
                    "dark:border-gray-800 " +
                    "rounded-xl overflow-hidden"
                  }
                >
                  <button
                    type="button"
                    className={
                      "w-full flex items-center " +
                      "justify-between p-5 " +
                      "text-left font-medium " +
                      "text-gray-900 " +
                      "dark:text-white " +
                      "hover:bg-gray-50 " +
                      "dark:hover:bg-gray-900 " +
                      "transition-colors"
                    }
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : i
                      )
                    }
                  >
                    <span>
                      {isKo
                        ? faq.qKo
                        : faq.qEn}
                    </span>
                    <ChevronDown
                      className={
                        "h-5 w-5 shrink-0 " +
                        "transition-transform " +
                        "duration-200 " +
                        (isOpen
                          ? "rotate-180"
                          : "")
                      }
                      style={{
                        color: colors.primary,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={
                        "px-5 pb-5 " +
                        "text-gray-700 " +
                        "dark:text-gray-300 " +
                        "leading-relaxed"
                      }
                    >
                      {isKo
                        ? faq.aKo
                        : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className={
              "bg-gray-50 dark:bg-gray-900 " +
              "rounded-2xl p-8 text-center"
            }
          >
            <Mail
              className="h-8 w-8 mx-auto mb-4"
              style={{ color: colors.primary }}
            />
            <h3
              className={
                "text-lg font-semibold mb-2 " +
                "text-gray-900 dark:text-white"
              }
            >
              {isKo
                ? "환불 관련 문의"
                : "Refund Inquiries"}
            </h3>
            <p
              className={
                "text-gray-600 " +
                "dark:text-gray-400"
              }
            >
              <a
                href="mailto:help@newkl.net"
                className="font-medium underline"
                style={{
                  color: colors.primary,
                }}
              >
                help@newkl.net
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
