"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FileText, ChevronRight } from "lucide-react";

interface Section {
  id: string;
  titleKo: string;
  titleEn: string;
  contentKo: string[];
  contentEn: string[];
}

const sections: Section[] = [
  {
    id: "overview",
    titleKo: "1. 서비스 개요",
    titleEn: "1. Overview of Services",
    contentKo: [
      "GrowAI(이하 \"서비스\")는 NEWKL이 운영하는 " +
      "AI 기반 영상 생성 및 이러닝 콘텐츠 자동 " +
      "생성 플랫폼입니다. 본 약관은 서비스의 " +
      "이용 조건 및 절차, 회사와 이용자의 권리·" +
      "의무 및 책임사항을 규정합니다.",
      "본 약관에 동의하고 서비스에 가입함으로써 " +
      "귀하는 본 약관의 모든 조건에 구속되는 것에 " +
      "동의합니다. 본 약관에 동의하지 않는 경우 " +
      "서비스를 이용하실 수 없습니다.",
      "회사는 관련 법령을 위반하지 않는 범위에서 " +
      "본 약관을 개정할 수 있으며, 개정 시 " +
      "적용일자 및 개정사유를 명시하여 현행 약관과 " +
      "함께 서비스 내 공지합니다.",
    ],
    contentEn: [
      "GrowAI (the \"Service\") is an AI-powered " +
      "video generation and e-learning content " +
      "creation platform operated by NEWKL. These " +
      "Terms govern your access to and use of the " +
      "Service, and set forth the rights, " +
      "obligations, and responsibilities of both " +
      "the Company and the User.",
      "By agreeing to these Terms and creating an " +
      "account, you acknowledge that you are bound " +
      "by all conditions herein. If you do not " +
      "agree to these Terms, you may not access " +
      "or use the Service.",
      "The Company may revise these Terms to the " +
      "extent permitted by applicable law. Any " +
      "revisions will be posted within the Service " +
      "along with the effective date and the " +
      "reason for the change.",
    ],
  },
  {
    id: "eligibility",
    titleKo: "2. 이용 자격",
    titleEn: "2. Eligibility",
    contentKo: [
      "서비스는 만 14세 이상의 개인 또는 적법하게 " +
      "설립된 법인이 이용할 수 있습니다. 만 14세 " +
      "미만의 아동은 법정대리인의 동의 없이 서비스에 " +
      "가입하거나 이용할 수 없습니다.",
      "이용자는 가입 시 정확하고 완전한 정보를 " +
      "제공해야 하며, 허위 정보 제공 시 서비스 " +
      "이용이 제한되거나 계정이 해지될 수 있습니다.",
      "법률에 의해 서비스 이용이 금지된 지역에 " +
      "거주하는 경우, 또는 이전에 약관 위반으로 " +
      "계정이 해지된 경우에는 서비스를 이용할 " +
      "수 없습니다.",
    ],
    contentEn: [
      "The Service is available to individuals " +
      "aged 14 or older, or to entities duly " +
      "organized under applicable law. Minors " +
      "under the age of 14 may not register for " +
      "or use the Service without verifiable " +
      "parental consent.",
      "You must provide accurate and complete " +
      "information when creating your account. " +
      "Providing false or misleading information " +
      "may result in restrictions on your access " +
      "or termination of your account.",
      "You may not use the Service if you reside " +
      "in a jurisdiction where the Service is " +
      "prohibited by law, or if your account " +
      "has previously been terminated for " +
      "violation of these Terms.",
    ],
  },
  {
    id: "account",
    titleKo: "3. 계정 및 보안",
    titleEn: "3. Account & Security",
    contentKo: [
      "이용자는 자신의 계정 정보 및 비밀번호를 " +
      "안전하게 관리할 책임이 있습니다. 계정의 " +
      "무단 사용이 발견되면 즉시 회사에 " +
      "통보해야 합니다.",
      "회사는 이용자의 계정 보안을 위해 다단계 " +
      "인증, 비밀번호 암호화, 세션 관리 등 " +
      "합리적인 보안 조치를 시행합니다. 그러나 " +
      "이용자의 부주의로 인한 정보 유출에 대해서는 " +
      "책임을 지지 않습니다.",
      "회사는 보안 위협이 감지되거나 약관 위반이 " +
      "의심되는 경우, 사전 통지 없이 계정 접근을 " +
      "일시적으로 제한할 수 있습니다.",
    ],
    contentEn: [
      "You are responsible for maintaining the " +
      "confidentiality of your account credentials " +
      "and password. You must notify the Company " +
      "immediately upon discovering any " +
      "unauthorized use of your account.",
      "The Company implements reasonable security " +
      "measures including multi-factor " +
      "authentication, password encryption, and " +
      "session management. However, the Company " +
      "shall not be liable for information " +
      "disclosure resulting from your negligence.",
      "The Company may temporarily restrict " +
      "access to your account without prior " +
      "notice if a security threat is detected " +
      "or a violation of these Terms is " +
      "suspected.",
    ],
  },
  {
    id: "acceptable-use",
    titleKo: "4. 서비스 이용 규칙",
    titleEn: "4. Acceptable Use",
    contentKo: [
      "이용자는 서비스를 합법적인 목적으로만 " +
      "사용해야 합니다. 불법 콘텐츠 생성, 타인의 " +
      "권리 침해, 허위 정보 유포, 시스템 보안 " +
      "위협 행위 등은 엄격히 금지됩니다.",
      "AI를 활용하여 생성한 콘텐츠는 이용자가 " +
      "최종 검토 및 확인할 책임이 있으며, " +
      "생성된 콘텐츠의 정확성과 적법성에 대한 " +
      "책임은 이용자에게 있습니다.",
      "서비스의 역공학, 무단 크롤링, API 남용, " +
      "자동화된 대량 요청 등 서비스의 정상적인 " +
      "운영을 방해하는 행위는 금지되며, 위반 시 " +
      "서비스 이용이 영구 제한될 수 있습니다.",
    ],
    contentEn: [
      "You shall use the Service only for lawful " +
      "purposes. The creation of illegal content, " +
      "infringement of third-party rights, " +
      "dissemination of false information, and " +
      "any conduct threatening system security " +
      "are strictly prohibited.",
      "You are solely responsible for reviewing " +
      "and verifying all AI-generated content. " +
      "The accuracy and legality of content " +
      "produced through the Service remains " +
      "your responsibility.",
      "Reverse engineering, unauthorized " +
      "crawling, API abuse, automated bulk " +
      "requests, or any activity that disrupts " +
      "normal operation of the Service is " +
      "prohibited and may result in permanent " +
      "suspension of your account.",
    ],
  },
  {
    id: "intellectual-property",
    titleKo: "5. 지적 재산권",
    titleEn: "5. Intellectual Property",
    contentKo: [
      "서비스의 소프트웨어, 디자인, 로고, 상표 " +
      "및 기술적 인프라에 대한 모든 지적 재산권은 " +
      "회사에 귀속됩니다. 이용자는 회사의 사전 " +
      "서면 동의 없이 이를 복제, 배포, 수정할 " +
      "수 없습니다.",
      "이용자가 서비스를 통해 생성한 콘텐츠에 " +
      "대한 권리는 이용자에게 귀속됩니다. 다만, " +
      "이용자는 회사가 서비스 개선 및 홍보 " +
      "목적으로 해당 콘텐츠를 비식별화하여 " +
      "활용할 수 있는 제한적 라이선스를 부여합니다.",
      "이용자가 업로드하는 원본 자료에 대한 " +
      "저작권 및 기타 권리는 원저작자에게 있으며, " +
      "이용자는 해당 자료를 사용할 적법한 권한이 " +
      "있음을 보증합니다.",
    ],
    contentEn: [
      "All intellectual property rights in the " +
      "Service's software, design, logos, " +
      "trademarks, and technical infrastructure " +
      "belong to the Company. You may not " +
      "reproduce, distribute, or modify these " +
      "without prior written consent.",
      "You retain ownership of content you " +
      "create through the Service. However, you " +
      "grant the Company a limited license to " +
      "use de-identified versions of such " +
      "content for service improvement and " +
      "promotional purposes.",
      "Copyright and other rights in source " +
      "materials you upload remain with the " +
      "original rights holder. You warrant " +
      "that you have lawful authority to use " +
      "any materials you upload to the Service.",
    ],
  },
  {
    id: "fees",
    titleKo: "6. 요금 및 결제",
    titleEn: "6. Fees & Payment",
    contentKo: [
      "서비스의 요금 체계는 별도의 요금표에 " +
      "명시됩니다. 회사는 30일 전 사전 통지를 " +
      "통해 요금을 변경할 수 있으며, 변경된 " +
      "요금은 다음 결제 주기부터 적용됩니다.",
      "유료 서비스는 선불 방식으로 결제되며, " +
      "결제 후에는 관련 법령에서 정한 경우를 " +
      "제외하고 환불이 제한될 수 있습니다. " +
      "무료 체험 기간이 제공되는 경우, 해당 " +
      "기간 종료 후 자동으로 유료 전환됩니다.",
      "결제 실패 시 회사는 이용자에게 통지하며, " +
      "합리적인 유예 기간 내에 결제가 완료되지 " +
      "않을 경우 서비스 접근이 제한될 수 있습니다.",
    ],
    contentEn: [
      "The fee structure for the Service is " +
      "set forth in a separate pricing schedule. " +
      "The Company may modify fees with 30 days' " +
      "prior notice, and updated fees will take " +
      "effect at the start of the next billing " +
      "cycle.",
      "Paid services are billed on a prepaid " +
      "basis. Refunds may be limited after " +
      "payment except as required by applicable " +
      "law. If a free trial is offered, your " +
      "subscription will automatically convert " +
      "to a paid plan upon expiration.",
      "In the event of a payment failure, the " +
      "Company will notify you and provide a " +
      "reasonable grace period. Access to the " +
      "Service may be restricted if payment " +
      "is not completed within that period.",
    ],
  },
  {
    id: "changes",
    titleKo: "7. 서비스 변경 및 종료",
    titleEn: "7. Changes & Termination",
    contentKo: [
      "회사는 서비스의 전부 또는 일부를 변경, " +
      "중단하거나 종료할 수 있습니다. 중대한 " +
      "변경 사항은 최소 30일 전에 서비스 내 " +
      "공지 또는 이메일을 통해 통지합니다.",
      "이용자는 언제든지 계정을 삭제하여 서비스 " +
      "이용을 종료할 수 있습니다. 계정 삭제 시 " +
      "이용자의 데이터는 관련 법령에서 정한 " +
      "보존 기간을 제외하고 합리적인 기간 내에 " +
      "삭제됩니다.",
      "회사는 이용자가 본 약관을 위반하는 경우 " +
      "사전 통지 후 또는 긴급한 경우 통지 " +
      "없이 서비스 이용을 제한하거나 계정을 " +
      "해지할 수 있습니다.",
    ],
    contentEn: [
      "The Company may modify, suspend, or " +
      "discontinue all or part of the Service. " +
      "Material changes will be communicated " +
      "at least 30 days in advance via " +
      "in-Service notice or email.",
      "You may terminate your use of the " +
      "Service at any time by deleting your " +
      "account. Upon deletion, your data will " +
      "be removed within a reasonable period, " +
      "except as required by law for data " +
      "retention purposes.",
      "The Company may restrict your access or " +
      "terminate your account if you violate " +
      "these Terms, with prior notice or, in " +
      "urgent cases, without notice.",
    ],
  },
  {
    id: "liability",
    titleKo: "8. 책임 제한",
    titleEn: "8. Limitation of Liability",
    contentKo: [
      "회사는 서비스를 \"있는 그대로\" 제공하며, " +
      "서비스의 중단 없는 운영, 오류 부재, " +
      "특정 목적에 대한 적합성을 보증하지 " +
      "않습니다. AI 생성 콘텐츠의 정확성, " +
      "완전성에 대해서도 보증하지 않습니다.",
      "관련 법령이 허용하는 최대 범위 내에서, " +
      "회사는 서비스 이용과 관련하여 발생하는 " +
      "간접적, 부수적, 특별, 결과적 또는 " +
      "징벌적 손해에 대해 책임을 지지 않습니다.",
      "본 약관에서 달리 정하지 않는 한, 회사의 " +
      "총 책임은 해당 손해 발생 직전 12개월간 " +
      "이용자가 지불한 서비스 요금 총액을 " +
      "초과하지 않습니다.",
    ],
    contentEn: [
      "The Service is provided \"as is\" without " +
      "warranties of any kind. The Company does " +
      "not guarantee uninterrupted operation, " +
      "absence of errors, or fitness for a " +
      "particular purpose. No warranty is made " +
      "regarding the accuracy or completeness " +
      "of AI-generated content.",
      "To the maximum extent permitted by " +
      "applicable law, the Company shall not " +
      "be liable for any indirect, incidental, " +
      "special, consequential, or punitive " +
      "damages arising from your use of the " +
      "Service.",
      "Unless otherwise specified in these " +
      "Terms, the Company's total liability " +
      "shall not exceed the total fees paid " +
      "by you for the Service during the " +
      "twelve (12) months immediately preceding " +
      "the event giving rise to the claim.",
    ],
  },
];

const tocItems = sections.map((s) => ({
  id: s.id,
  labelKo: s.titleKo,
  labelEn: s.titleEn,
}));

export default function TermsContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  return (
    <section
      className="bg-white dark:bg-gray-950 pt-32 pb-24"
    >
      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16">
        <div className="flex flex-col items-center text-center">
          <div
            className={
              "w-16 h-16 rounded-2xl flex items-center " +
              "justify-center mb-6"
            }
            style={{
              backgroundColor: `${colors.primary}1a`,
            }}
          >
            <FileText
              className="w-8 h-8"
              style={{ color: colors.primary }}
              strokeWidth={1.5}
            />
          </div>
          <h1
            className={
              "text-4xl md:text-5xl font-bold " +
              "text-gray-900 dark:text-white"
            }
          >
            {isKo ? "이용약관" : "Terms of Service"}
          </h1>
          <p
            className={
              "mt-4 text-gray-500 dark:text-gray-400"
            }
          >
            {isKo
              ? "최종 수정: 2026년 4월 1일"
              : "Last updated: April 1, 2026"}
          </p>
        </div>
      </div>

      {/* Body: TOC + Content */}
      <div
        className={
          "max-w-[1200px] mx-auto px-6 " +
          "flex flex-col md:flex-row gap-12"
        }
      >
        {/* Table of Contents - sidebar */}
        <nav
          className={
            "hidden md:block w-64 shrink-0 " +
            "sticky top-32 self-start"
          }
        >
          <p
            className={
              "text-xs uppercase tracking-widest " +
              "font-semibold text-gray-400 " +
              "dark:text-gray-500 mb-4"
            }
          >
            {isKo ? "목차" : "Contents"}
          </p>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={
                    "flex items-center gap-2 " +
                    "text-sm text-gray-600 " +
                    "hover:text-gray-900 " +
                    "dark:text-gray-400 " +
                    "dark:hover:text-gray-200 " +
                    "transition-colors"
                  }
                >
                  <ChevronRight
                    className="w-3 h-3 shrink-0"
                    style={{ color: colors.primary }}
                  />
                  <span>
                    {isKo
                      ? item.labelKo
                      : item.labelEn}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile TOC */}
        <nav className="md:hidden mb-8">
          <p
            className={
              "text-xs uppercase tracking-widest " +
              "font-semibold text-gray-400 " +
              "dark:text-gray-500 mb-3"
            }
          >
            {isKo ? "목차" : "Contents"}
          </p>
          <ul className="space-y-1.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={
                    "flex items-center gap-2 " +
                    "text-sm text-gray-600 " +
                    "hover:text-gray-900 " +
                    "dark:text-gray-400 " +
                    "dark:hover:text-gray-200 " +
                    "transition-colors"
                  }
                >
                  <ChevronRight
                    className="w-3 h-3 shrink-0"
                    style={{ color: colors.primary }}
                  />
                  <span>
                    {isKo
                      ? item.labelKo
                      : item.labelEn}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal Content */}
        <div className="flex-1 max-w-3xl">
          {sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="mb-12"
            >
              <h2
                className={
                  "text-xl font-semibold " +
                  "text-gray-900 dark:text-white " +
                  "border-l-4 pl-4 mb-4"
                }
                style={{
                  borderColor: colors.primary,
                }}
              >
                {isKo
                  ? section.titleKo
                  : section.titleEn}
              </h2>
              <div className="space-y-4 pl-5">
                {(isKo
                  ? section.contentKo
                  : section.contentEn
                ).map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      "text-gray-700 " +
                      "dark:text-gray-300 " +
                      "leading-relaxed"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {/* Contact */}
          <div
            className={
              "mt-16 p-6 rounded-xl " +
              "bg-gray-50 dark:bg-gray-900 " +
              "border border-gray-200 " +
              "dark:border-gray-800"
            }
          >
            <p
              className={
                "text-gray-700 dark:text-gray-300"
              }
            >
              {isKo
                ? "문의사항이 있으시면 "
                : "For questions, contact us at "}
              <a
                href="mailto:help@newkl.net"
                className="font-medium underline"
                style={{ color: colors.primary }}
              >
                help@newkl.net
              </a>
              {isKo
                ? "으로 연락하세요."
                : "."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
