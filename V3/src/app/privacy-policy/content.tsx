"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Shield,
  Database,
  Settings,
  UserCheck,
  ChevronRight,
} from "lucide-react";

const SECTIONS = [
  { id: "collect", ko: "개인정보 수집 항목", en: "Information We Collect" },
  { id: "how", ko: "수집 방법", en: "How We Collect" },
  { id: "purpose", ko: "이용 목적", en: "Purpose of Use" },
  { id: "retention", ko: "보유 기간", en: "Retention Period" },
  { id: "third-party", ko: "제3자 제공", en: "Third-Party Sharing" },
  { id: "cookies", ko: "쿠키 사용", en: "Cookie Policy" },
  { id: "rights", ko: "이용자 권리", en: "User Rights" },
  { id: "children", ko: "아동 보호", en: "Children's Privacy" },
  { id: "transfer", ko: "국제 데이터 전송", en: "International Data Transfer" },
  { id: "changes", ko: "정책 변경", en: "Changes to Policy" },
] as const;

export default function PrivacyPolicyContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section
        className="pt-32 pb-16 text-center"
        style={{
          background:
            `linear-gradient(135deg, ${colors.primary}10 0%, transparent 60%)`,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            className="inline-flex items-center justify-center
              w-16 h-16 rounded-2xl mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <Shield
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold
              text-gray-900 dark:text-white mb-4"
          >
            {isKo ? "개인정보처리방침" : "Privacy Policy"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {isKo
              ? "최종 업데이트: 2026년 4월 1일"
              : "Last updated: April 1, 2026"}
          </p>
        </div>
      </section>

      {/* Key Points Summary */}
      <section className="max-w-[1200px] mx-auto px-6 -mt-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KeyPointCard
            icon={<Database className="w-6 h-6" />}
            title={
              isKo ? "수집하는 정보" : "What We Collect"
            }
            description={
              isKo
                ? "서비스 제공에 필요한 최소한의 정보만 수집합니다."
                : "We collect only the minimal data needed to deliver our service."
            }
            color={colors.primary}
          />
          <KeyPointCard
            icon={<Settings className="w-6 h-6" />}
            title={
              isKo ? "정보 활용 방법" : "How We Use It"
            }
            description={
              isKo
                ? "수집된 정보는 오직 서비스 개선 목적으로만 활용됩니다."
                : "Collected data is used solely for service improvement."
            }
            color={colors.primary}
          />
          <KeyPointCard
            icon={<UserCheck className="w-6 h-6" />}
            title={
              isKo ? "이용자 권리" : "Your Rights"
            }
            description={
              isKo
                ? "언제든지 개인정보에 대한 완전한 통제권을 행사할 수 있습니다."
                : "You have full control over your data at any time."
            }
            color={colors.primary}
          />
        </div>
      </section>

      {/* Main Content: TOC + Policy */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents */}
          <aside className="lg:w-64 shrink-0">
            <nav
              className="lg:sticky lg:top-28 rounded-2xl
                border border-gray-200 dark:border-gray-800
                p-5"
            >
              <h2
                className="text-sm font-semibold uppercase
                  tracking-wider text-gray-400
                  dark:text-gray-500 mb-4"
              >
                {isKo ? "목차" : "Contents"}
              </h2>
              <ul className="space-y-2">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-2
                        text-sm text-gray-600
                        dark:text-gray-400
                        hover:text-gray-900
                        dark:hover:text-white
                        transition-colors"
                    >
                      <ChevronRight
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: colors.primary }}
                      />
                      <span>
                        {i + 1}. {isKo ? s.ko : s.en}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Policy Content */}
          <div className="flex-1 max-w-3xl">
            {/* Section 1 */}
            <PolicySection
              id="collect"
              number={1}
              title={
                isKo
                  ? "개인정보 수집 항목"
                  : "Information We Collect"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "GrowAI는 서비스 제공을 위해 다음과 같은 최소한의 개인정보를 수집합니다."
                  : "GrowAI collects the following minimal personal information to provide our services."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "필수 항목: 이메일 주소, 이름, 비밀번호(암호화 저장)"
                    : "Required: email address, name, password (encrypted)"}
                </li>
                <li>
                  {isKo
                    ? "선택 항목: 프로필 사진, 소속 기관, 직책"
                    : "Optional: profile photo, organization, job title"}
                </li>
                <li>
                  {isKo
                    ? "자동 수집: IP 주소, 브라우저 유형, 접속 로그, 서비스 이용 기록"
                    : "Automatically collected: IP address, browser type, access logs, usage records"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "AI 콘텐츠 생성 시 입력하는 프롬프트 데이터는 서비스 품질 향상을 위해 익명화 처리 후 분석될 수 있습니다."
                  : "Prompt data entered during AI content generation may be anonymized and analyzed to improve service quality."}
              </p>
            </PolicySection>

            {/* Section 2 */}
            <PolicySection
              id="how"
              number={2}
              title={
                isKo ? "수집 방법" : "How We Collect"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "개인정보는 다음과 같은 방법으로 수집됩니다."
                  : "Personal information is collected through the following methods."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "회원가입 및 서비스 이용 과정에서 이용자가 직접 입력"
                    : "Direct input by users during registration and service use"}
                </li>
                <li>
                  {isKo
                    ? "서비스 이용 중 자동으로 생성되어 수집(로그 데이터)"
                    : "Automatically generated during service use (log data)"}
                </li>
                <li>
                  {isKo
                    ? "Google, Microsoft 등 소셜 로그인 연동 시 제공받는 정보"
                    : "Information received through social login integrations such as Google and Microsoft"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "이용자의 명시적 동의 없이 민감정보(건강, 정치적 성향 등)는 일체 수집하지 않습니다."
                  : "We never collect sensitive information (health, political views, etc.) without explicit consent."}
              </p>
            </PolicySection>

            {/* Section 3 */}
            <PolicySection
              id="purpose"
              number={3}
              title={
                isKo ? "이용 목적" : "Purpose of Use"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "수집된 개인정보는 다음 목적으로만 이용됩니다."
                  : "Collected personal information is used only for the following purposes."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "회원 관리: 본인 확인, 서비스 이용 자격 관리"
                    : "Account management: identity verification, eligibility management"}
                </li>
                <li>
                  {isKo
                    ? "서비스 제공: AI 영상 생성, 콘텐츠 관리, 학습 분석"
                    : "Service delivery: AI video generation, content management, learning analytics"}
                </li>
                <li>
                  {isKo
                    ? "서비스 개선: 이용 통계, 품질 향상, 신규 기능 개발"
                    : "Service improvement: usage statistics, quality enhancement, new feature development"}
                </li>
                <li>
                  {isKo
                    ? "고객 지원: 문의 응대, 공지사항 전달"
                    : "Customer support: inquiry responses, notice delivery"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "마케팅 목적의 정보 이용 시 별도의 동의를 받으며, 이용자는 언제든 철회할 수 있습니다."
                  : "Separate consent is obtained for marketing use, and users may withdraw consent at any time."}
              </p>
            </PolicySection>

            {/* Section 4 */}
            <PolicySection
              id="retention"
              number={4}
              title={
                isKo ? "보유 기간" : "Retention Period"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "개인정보는 수집 목적이 달성된 후 지체 없이 파기합니다. 다만 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 안전하게 보관합니다."
                  : "Personal information is destroyed without delay after its purpose has been fulfilled. However, when retention is required by applicable laws, data is securely stored for the mandated period."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "회원 탈퇴 시: 즉시 파기 (법적 보관 의무 항목 제외)"
                    : "Upon account deletion: immediate destruction (except legally required items)"}
                </li>
                <li>
                  {isKo
                    ? "전자상거래 기록: 5년 (전자상거래법)"
                    : "E-commerce records: 5 years (E-Commerce Act)"}
                </li>
                <li>
                  {isKo
                    ? "접속 로그: 3개월 (통신비밀보호법)"
                    : "Access logs: 3 months (Communications Privacy Act)"}
                </li>
              </ul>
            </PolicySection>

            {/* Section 5 */}
            <PolicySection
              id="third-party"
              number={5}
              title={
                isKo
                  ? "제3자 제공"
                  : "Third-Party Sharing"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "GrowAI는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외적으로 제공할 수 있습니다."
                  : "GrowAI does not, as a rule, provide personal information to third parties. Exceptions may apply in the following cases."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "이용자가 사전에 명시적으로 동의한 경우"
                    : "When the user has given explicit prior consent"}
                </li>
                <li>
                  {isKo
                    ? "법령에 의해 요구되는 경우 (수사기관 요청 등)"
                    : "When required by law (e.g., law enforcement requests)"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "AI 모델 학습을 위해 이용자의 콘텐츠를 외부 AI 서비스(Google Gemini, Anthropic Claude)에 전달할 수 있으나, 이 경우 개인 식별 정보는 제거됩니다."
                  : "User content may be sent to external AI services (Google Gemini, Anthropic Claude) for model processing, but personally identifiable information is removed."}
              </p>
            </PolicySection>

            {/* Section 6 */}
            <PolicySection
              id="cookies"
              number={6}
              title={
                isKo ? "쿠키 사용" : "Cookie Policy"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "GrowAI는 개인화된 서비스를 제공하기 위해 쿠키를 사용합니다. 쿠키는 웹사이트 운영에 필수적인 기술 쿠키와 분석 쿠키로 구분됩니다."
                  : "GrowAI uses cookies to provide a personalized experience. Cookies are categorized into essential technical cookies and analytics cookies."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "필수 쿠키: 로그인 상태 유지, 언어 및 테마 설정"
                    : "Essential cookies: login state, language and theme preferences"}
                </li>
                <li>
                  {isKo
                    ? "분석 쿠키: 서비스 이용 패턴 분석 (Google Analytics)"
                    : "Analytics cookies: usage pattern analysis (Google Analytics)"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "브라우저 설정을 통해 쿠키 수집을 거부할 수 있으나, 일부 서비스 이용이 제한될 수 있습니다."
                  : "You can refuse cookie collection through browser settings, though some services may be limited."}
              </p>
            </PolicySection>

            {/* Section 7 */}
            <PolicySection
              id="rights"
              number={7}
              title={
                isKo ? "이용자 권리" : "User Rights"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "이용자는 개인정보에 관하여 다음과 같은 권리를 행사할 수 있습니다."
                  : "Users may exercise the following rights regarding their personal information."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "개인정보 열람, 정정, 삭제 요청"
                    : "Request to view, correct, or delete personal data"}
                </li>
                <li>
                  {isKo
                    ? "개인정보 처리 정지 요청"
                    : "Request to suspend data processing"}
                </li>
                <li>
                  {isKo
                    ? "개인정보 이동권 (데이터 포터빌리티)"
                    : "Right to data portability"}
                </li>
                <li>
                  {isKo
                    ? "자동화된 의사결정에 대한 거부권"
                    : "Right to refuse automated decision-making"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "권리 행사는 설정 페이지 또는 개인정보 보호책임자에게 이메일로 요청할 수 있으며, 지체 없이 처리됩니다."
                  : "Rights can be exercised via the settings page or by contacting the Data Protection Officer. Requests are processed without delay."}
              </p>
            </PolicySection>

            {/* Section 8 */}
            <PolicySection
              id="children"
              number={8}
              title={
                isKo
                  ? "아동 보호"
                  : "Children's Privacy"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "GrowAI는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 만 14세 미만의 아동이 서비스를 이용하려면 법정대리인의 동의가 필요합니다."
                  : "GrowAI does not collect personal information from children under 14 years of age. Children under 14 require parental or guardian consent to use the service."}
              </p>
              <p className="mt-3">
                {isKo
                  ? "법정대리인은 아동의 개인정보 열람, 정정, 삭제를 요청할 수 있으며, 동의 철회도 가능합니다. 아동의 개인정보가 수집된 것을 발견한 경우 즉시 삭제 조치를 취합니다."
                  : "Guardians may request to view, correct, or delete their child's data, and may withdraw consent. If we discover that data from a child has been collected, we will delete it immediately."}
              </p>
            </PolicySection>

            {/* Section 9 */}
            <PolicySection
              id="transfer"
              number={9}
              title={
                isKo
                  ? "국제 데이터 전송"
                  : "International Data Transfer"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "GrowAI는 글로벌 AI 서비스 제공을 위해 개인정보가 해외로 전송될 수 있습니다. 이 경우 적절한 보호 조치를 적용합니다."
                  : "To deliver our global AI services, personal information may be transferred internationally. Appropriate safeguards are applied in such cases."}
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-3">
                <li>
                  {isKo
                    ? "클라우드 인프라: Google Cloud (미국, 일본 리전)"
                    : "Cloud infrastructure: Google Cloud (US, Japan regions)"}
                </li>
                <li>
                  {isKo
                    ? "AI 처리: Google Gemini API, Anthropic Claude API"
                    : "AI processing: Google Gemini API, Anthropic Claude API"}
                </li>
              </ul>
              <p className="mt-3">
                {isKo
                  ? "모든 국제 전송은 표준 계약 조항(SCC) 또는 동등한 법적 보호 장치를 기반으로 수행됩니다."
                  : "All international transfers are conducted under Standard Contractual Clauses (SCC) or equivalent legal safeguards."}
              </p>
            </PolicySection>

            {/* Section 10 */}
            <PolicySection
              id="changes"
              number={10}
              title={
                isKo
                  ? "정책 변경"
                  : "Changes to Policy"
              }
              color={colors.primary}
            >
              <p>
                {isKo
                  ? "본 개인정보처리방침은 관련 법령 또는 서비스 변경에 따라 수정될 수 있습니다. 중요한 변경 사항이 있는 경우 서비스 내 공지 또는 이메일을 통해 사전에 안내합니다."
                  : "This Privacy Policy may be updated in accordance with changes in applicable laws or our services. Significant changes will be communicated in advance through in-app notices or email."}
              </p>
              <p className="mt-3">
                {isKo
                  ? "변경된 방침은 공지한 날로부터 7일 후에 효력이 발생합니다. 변경 내용에 동의하지 않는 경우 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다."
                  : "Updated policies take effect 7 days after announcement. If you disagree with any changes, you may discontinue use and request account deletion."}
              </p>
            </PolicySection>

            {/* Contact DPO */}
            <div
              className="mt-16 rounded-2xl p-8
                border border-gray-200 dark:border-gray-800"
              style={{
                background:
                  `linear-gradient(135deg, ${colors.primary}08 0%, transparent 60%)`,
              }}
            >
              <h3
                className="text-xl font-semibold
                  text-gray-900 dark:text-white mb-3"
              >
                {isKo
                  ? "개인정보 보호책임자 (DPO)"
                  : "Data Protection Officer (DPO)"}
              </h3>
              <p
                className="text-gray-700 dark:text-gray-300
                  leading-relaxed mb-4"
              >
                {isKo
                  ? "개인정보 관련 문의, 권리 행사 요청, 또는 불만 사항이 있으시면 아래 연락처로 문의해 주시기 바랍니다."
                  : "For privacy inquiries, rights requests, or complaints, please contact us using the information below."}
              </p>
              <div
                className="space-y-2 text-gray-700
                  dark:text-gray-300"
              >
                <p>
                  <span className="font-medium">
                    {isKo ? "담당자" : "Contact"}:
                  </span>{" "}
                  {isKo
                    ? "NEWKL 개인정보 보호팀"
                    : "NEWKL Privacy Team"}
                </p>
                <p>
                  <span className="font-medium">
                    {isKo ? "이메일" : "Email"}:
                  </span>{" "}
                  <a
                    href="mailto:help@newkl.net"
                    className="underline hover:opacity-80
                      transition-opacity"
                    style={{ color: colors.primary }}
                  >
                    help@newkl.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------ */
/* Sub-components                                   */
/* ------------------------------------------------ */

function KeyPointCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className="border border-gray-200
        dark:border-gray-800 rounded-2xl p-6"
    >
      <div
        className="inline-flex items-center justify-center
          w-10 h-10 rounded-xl mb-4"
        style={{ backgroundColor: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <h3
        className="text-lg font-semibold
          text-gray-900 dark:text-white mb-2"
      >
        {title}
      </h3>
      <p
        className="text-gray-600 dark:text-gray-400
          text-sm leading-relaxed"
      >
        {description}
      </p>
    </div>
  );
}

function PolicySection({
  id,
  number,
  title,
  color,
  children,
}: {
  id: string;
  number: number;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <h2
        className="text-xl font-semibold border-l-4 pl-4
          text-gray-900 dark:text-white mb-4"
        style={{ borderColor: color }}
      >
        {number}. {title}
      </h2>
      <div
        className="text-gray-700 dark:text-gray-300
          leading-relaxed"
      >
        {children}
      </div>
    </section>
  );
}
