"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import {
  BookOpen,
  LayoutDashboard,
  Factory,
  Video,
  FileVideo,
  MessageCircle,
  Code2,
  Globe,
  HardHat,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    code: "LearnForm",
    name: "AI LMS Content Platform",
    desc: "CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성",
    detail:
      "GPT-4o · Claude · Gemini 멀티 AI로 교수설계부터 평가까지 자동화.\nCREATOR 7단계 + FKDS 순환 모델로 깊이 있는 학습 경험을 완성합니다.",
    path: "/learnform",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    code: "LMS",
    name: "Learning Management System",
    desc: "체계적인 학습 관리와 진도 추적 시스템",
    detail:
      "학습자별 맞춤 커리큘럼 설계, 실시간 진도 추적, AI 기반 성과 분석 대시보드를 제공합니다. SCORM/xAPI 표준을 지원하며 기존 교육 시스템과 원클릭 연동됩니다.",
    path: "/lms",
    icon: LayoutDashboard,
    gradient: "from-violet-500 to-purple-400",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    code: "MAP",
    name: "Manufacturing AI Platform",
    desc: "생산 공정의 지능화와 품질 최적화",
    detail:
      "실시간 센서 데이터 분석, 불량 예측, 공정 최적화를 AI로 자동화합니다. 디지털 트윈 기반 시뮬레이션과 예지보전(Predictive Maintenance)으로 가동률을 극대화합니다.",
    path: "/map",
    icon: Factory,
    gradient: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    code: "VLS",
    name: "Video Lecture System",
    desc: "시공간 제약 없는 실시간 화상 교육",
    detail:
      "HD/4K 실시간 스트리밍, 화면 공유, 화이트보드, 소그룹 토론방을 지원합니다. AI 실시간 자막, 자동 녹화, 출석 관리까지 원스톱으로 제공합니다.",
    path: "/vls",
    icon: Video,
    gradient: "from-orange-500 to-amber-400",
    glowColor: "rgba(249,115,22,0.15)",
  },
  {
    code: "VAS",
    name: "Video Auto Summary",
    desc: "AI 기반 영상 자동 요약으로 학습 효율 극대화",
    detail:
      "수천 시간의 강의 영상을 AI가 자동으로 분석하여 핵심 내용을 요약합니다. 챕터 자동 분할, 키워드 추출, 다국어 자막 생성으로 영상 콘텐츠 활용도를 극대화합니다.",
    path: "/vas",
    icon: FileVideo,
    gradient: "from-pink-500 to-rose-400",
    glowColor: "rgba(236,72,153,0.15)",
  },
  {
    code: "CCB",
    name: "Customer Care Bot",
    desc: "다국어 AI 챗봇으로 글로벌 고객 소통 혁신",
    detail:
      "20개 이상 언어를 지원하는 AI 챗봇이 24/7 고객 문의에 즉시 응답합니다. 자연어 이해(NLU) 기반 맥락 파악, 감정 분석, 자동 에스컬레이션으로 고객 만족도를 높입니다.",
    path: "/ccb",
    icon: MessageCircle,
    gradient: "from-cyan-500 to-sky-400",
    glowColor: "rgba(6,182,212,0.15)",
  },
  {
    code: "CCS",
    name: "Claude Code Skill",
    desc: "AI 코드 어시스턴트로 개발 생산성의 도약",
    detail:
      "Claude 기반 코드 생성, 리뷰, 디버깅, 리팩토링을 지원합니다. 35개 이상의 전문가 슬래시 명령으로 설계부터 배포까지 개발 전 과정을 가속화합니다.",
    path: "/ccs",
    icon: Code2,
    gradient: "from-indigo-500 to-blue-400",
    glowColor: "rgba(99,102,241,0.15)",
  },
  {
    code: "CDN",
    name: "Content Delivery Network",
    desc: "글로벌 엣지 캐싱으로 끊김 없는 미디어 경험",
    detail:
      "42개국 엣지 서버를 통한 초저지연 콘텐츠 전송, 적응형 비트레이트 스트리밍, DRM 보안, 실시간 트래픽 분석 대시보드를 제공합니다.",
    path: "/cdn",
    icon: Globe,
    gradient: "from-teal-500 to-green-400",
    glowColor: "rgba(20,184,166,0.15)",
  },
  {
    code: "CMS",
    name: "Construction Management",
    desc: "IoT + AI 기반 건설 현장 관리의 스마트화",
    detail:
      "IoT 센서 실시간 모니터링, AI 안전 사고 예측, BIM 데이터 통합, 공정률 자동 산출로 건설 현장의 디지털 전환을 실현합니다.",
    path: "/cms",
    icon: HardHat,
    gradient: "from-amber-500 to-yellow-400",
    glowColor: "rgba(245,158,11,0.15)",
  },
];

function AccordionItem({
  service,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  const Icon = service.icon;

  return (
    <div
      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
        isOpen
          ? "border-white/[0.12] bg-white/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03]"
      } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        transitionDelay: `${index * 60}ms`,
        boxShadow: isOpen
          ? `0 0 40px ${service.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "none",
      }}
    >
      {/* Header (always visible) */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
      >
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 ${
            isOpen ? "scale-110" : "group-hover:scale-105"
          }`}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
        </div>

        {/* Title area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] font-bold tracking-widest uppercase bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
            >
              {service.code}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-white mt-0.5 truncate">
            {service.name}
          </h3>
        </div>

        {/* Short desc (desktop only) */}
        <p className="hidden lg:block text-sm text-gray-500 max-w-[280px] truncate">
          {service.desc}
        </p>

        {/* Chevron */}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-6 pt-0">
            {/* Divider */}
            <div
              className={`h-px w-full bg-gradient-to-r ${service.gradient} opacity-20 mb-5`}
            />

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-1 lg:hidden">
              {service.desc}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {service.detail}
            </p>

            {/* CTA link */}
            <Link
              href={service.path}
              className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group/link`}
            >
              솔루션 자세히 보기
              <ArrowRight
                className="w-4 h-4 text-gray-400 transition-transform group-hover/link:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalServices() {
  const { ref: titleRef, isInView: titleVisible } = useInView();
  const { ref: listRef, isInView: listVisible } = useInView(0.05);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-[#06060a]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">
            9 Integrated Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            One Platform, Every Solution
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto whitespace-pre-line">
            {"교육 · 제조 · 영상 · 고객 서비스를 아우르는 AI 통합 솔루션.\n하나의 플랫폼에서 모두 해결합니다."}
          </p>
        </div>

        {/* Accordion list */}
        <div ref={listRef} className="flex flex-col gap-3">
          {services.map((service, i) => (
            <AccordionItem
              key={service.code}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex((prev) => (prev === i ? null : i))
              }
              isInView={listVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
