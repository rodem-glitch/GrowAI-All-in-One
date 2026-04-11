import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "GrowAI Platform Portal",
  description: "All-in-One AI Solutions by Nucle Inc.",
};

const services = [
  {
    code: "LearnForm",
    name: "AI E-Learning Content Platform",
    desc: "CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성",
    path: "/learnform",
  },
  {
    code: "LMS",
    name: "Learning Management System",
    desc: "체계적인 학습 관리와 진도 추적 시스템",
    path: "/lms",
  },
  {
    code: "MAP",
    name: "Manufacturing AI Platform",
    desc: "생산 공정의 지능화와 품질 최적화",
    path: "/map",
  },
  {
    code: "VLS",
    name: "Video Lecture System",
    desc: "시공간 제약 없는 실시간 화상 교육",
    path: "/vls",
  },
  {
    code: "VAS",
    name: "Video Auto Summary",
    desc: "AI 기반 영상 자동 요약으로 학습 효율 극대화",
    path: "/vas",
  },
  {
    code: "CCB",
    name: "Customer Care Bot",
    desc: "다국어 AI 챗봇으로 글로벌 고객 소통 혁신",
    path: "/ccb",
  },
  {
    code: "CCS",
    name: "Claude Code Skill",
    desc: "AI 코드 어시스턴트로 개발 생산성의 도약",
    path: "/ccs",
  },
  {
    code: "CDN",
    name: "Content Delivery Network",
    desc: "글로벌 엣지 캐싱으로 끊김 없는 미디어 경험",
    path: "/cdn",
  },
  {
    code: "CMS",
    name: "Construction Management System",
    desc: "IoT + AI 기반 건설 현장 관리의 스마트화",
    path: "/cms",
  },
];

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-xl font-bold text-primary"
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect
                width="34"
                height="34"
                rx="8"
                className="fill-primary"
              />
              <path
                d="M30 2Q23 9 13 19Q5 27 3 33Q16 25 25 14Q31 7 30 2Z"
                fill="white"
                fillOpacity={0.85}
              />
              <path
                d="M30 2Q17 17 3 33"
                stroke="white"
                strokeWidth="0.9"
                strokeOpacity={0.4}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            GrowAI
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          GrowAI Platform
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          All-in-One AI Solutions
        </p>
      </section>

      {/* Service Cards Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.code} href={svc.path} className="group block">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="inline-block w-fit rounded-lg bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                    {svc.code}
                  </span>
                  <CardTitle className="mt-2 text-lg">{svc.name}</CardTitle>
                  <CardDescription>{svc.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="border-t-0 bg-transparent">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:underline">
                    Enter
                    <span className="transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} GrowAI by Nucle Inc. All rights
        reserved.
      </footer>
    </div>
  );
}
