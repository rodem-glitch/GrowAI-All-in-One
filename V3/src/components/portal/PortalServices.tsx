"use client";

import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  BookOpen, LayoutDashboard, Factory, Video, FileVideo,
  MessageCircle, Code2, Globe, HardHat,
} from "lucide-react";

const services = [
  { code: "LearnForm", name: "AI LMS Content Platform", desc: "CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성", detail: "GPT-4o · Claude · Gemini 멀티 AI로 교수설계부터 평가까지 자동화.\nCREATOR 7단계 + FKDS 순환 모델로 깊이 있는 학습 경험을 완성합니다.", path: "/learnform", icon: BookOpen },
  { code: "LMS", name: "Learning Management System", desc: "체계적인 학습 관리와 진도 추적 시스템", detail: "학습자별 맞춤 커리큘럼 설계, 실시간 진도 추적, AI 기반 성과 분석 대시보드를 제공합니다. SCORM/xAPI 표준을 지원하며 기존 교육 시스템과 원클릭 연동됩니다.", path: "/lms", icon: LayoutDashboard },
  { code: "MAP", name: "Manufacturing AI Platform", desc: "생산 공정의 지능화와 품질 최적화", detail: "실시간 센서 데이터 분석, 불량 예측, 공정 최적화를 AI로 자동화합니다. 디지털 트윈 기반 시뮬레이션과 예지보전으로 가동률을 극대화합니다.", path: "/map", icon: Factory },
  { code: "VLS", name: "Video Lecture System", desc: "시공간 제약 없는 실시간 화상 교육", detail: "HD/4K 실시간 스트리밍, 화면 공유, 화이트보드, 소그룹 토론방을 지원합니다. AI 실시간 자막, 자동 녹화, 출석 관리까지 원스톱으로 제공합니다.", path: "/vls", icon: Video },
  { code: "VAS", name: "Video Auto Summary", desc: "AI 기반 영상 자동 요약으로 학습 효율 극대화", detail: "수천 시간의 강의 영상을 AI가 자동으로 분석하여 핵심 내용을 요약합니다. 챕터 자동 분할, 키워드 추출, 다국어 자막 생성으로 영상 콘텐츠 활용도를 극대화합니다.", path: "/vas", icon: FileVideo },
  { code: "CCB", name: "Customer Care Bot", desc: "다국어 AI 챗봇으로 글로벌 고객 소통 혁신", detail: "20개 이상 언어를 지원하는 AI 챗봇이 24/7 고객 문의에 즉시 응답합니다. 자연어 이해 기반 맥락 파악, 감정 분석, 자동 에스컬레이션으로 고객 만족도를 높입니다.", path: "/ccb", icon: MessageCircle },
  { code: "CCS", name: "Claude Code Skill", desc: "AI 코드 어시스턴트로 개발 생산성의 도약", detail: "Claude 기반 코드 생성, 리뷰, 디버깅, 리팩토링을 지원합니다. 35개 이상의 전문가 슬래시 명령으로 설계부터 배포까지 개발 전 과정을 가속화합니다.", path: "/ccs", icon: Code2 },
  { code: "CDN", name: "Content Delivery Network", desc: "글로벌 엣지 캐싱으로 끊김 없는 미디어 경험", detail: "42개국 엣지 서버를 통한 초저지연 콘텐츠 전송, 적응형 비트레이트 스트리밍, DRM 보안, 실시간 트래픽 분석 대시보드를 제공합니다.", path: "/cdn", icon: Globe },
  { code: "CMS", name: "Construction Management System", desc: "IoT + AI 기반 건설 현장 관리의 스마트화", detail: "IoT 센서 실시간 모니터링, AI 안전 사고 예측, BIM 데이터 통합, 공정률 자동 산출로 건설 현장의 디지털 전환을 실현합니다.", path: "/cms", icon: HardHat },
];

export default function PortalServices() {
  const { colors } = useTheme();

  return (
    <section id="services" className="py-24 px-6 bg-[#fbfbfb] dark:bg-gray-900">
      <div className="max-w-[800px] mx-auto">
        <p className="text-sm uppercase tracking-widest font-semibold text-center mb-2" style={{ color: colors.primary }}>
          9 Integrated Solutions
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          아홉 개의 답, 하나의 플랫폼.
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 text-center mt-4 whitespace-pre-line">
          {"교육이 바뀌고, 제조가 바뀌고, 영상이 바뀝니다.\n흩어져 있던 솔루션을, 우리는 하나로 모았습니다.\n이제 플랫폼을 옮길 필요가 없습니다."}
        </p>

        <Accordion className="mt-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <AccordionItem
                key={svc.code}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4 last:mb-0"
              >
                <AccordionTrigger className="w-full p-5 text-left">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${colors.primary}1a` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: colors.primary }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: colors.primary }}>
                        {svc.code}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {svc.name}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{svc.desc}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed whitespace-pre-line mb-4">{svc.detail}</p>
                  <Link
                    href={svc.path}
                    className="text-sm font-medium hover:underline"
                    style={{ color: colors.primary }}
                  >
                    솔루션 자세히 보기 →
                  </Link>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
