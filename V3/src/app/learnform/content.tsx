"use client";

import SolutionPage from "@/components/solutions/SolutionPage";
import PortalCREATOR from "@/components/portal/PortalCREATOR";
import PortalFKDS from "@/components/portal/PortalFKDS";
import { BookOpen, Sparkles, Route, Palette, Wand2, Brain, FileText } from "lucide-react";

export default function LearnFormContent() {
  return (
    <>
      <SolutionPage
        code="LearnForm"
        name="AI LMS Content Platform"
        tagline="CREATOR x FKDS 기반 AI 이러닝 콘텐츠 자동 생성"
        subtitle={"GPT-4o · Claude · Gemini 멀티 AI로\n교수설계부터 평가까지 자동화합니다."}
        icon={BookOpen}
        videoTitle="LearnForm 데모 영상"
        videoDesc="3분 안에 이러닝 콘텐츠가 만들어지는 과정을 확인하세요"
        features={[
          { icon: Sparkles, title: "멀티 AI 콘텐츠 생성", desc: "GPT-4o, Claude, Gemini를 동시에 활용하여 텍스트, 이미지, 영상, 퀴즈를 자동으로 생성합니다." },
          { icon: Route, title: "CREATOR 7단계 설계", desc: "Concept부터 Reflection까지 체계적인 교수설계 프레임워크를 AI가 자동으로 적용합니다." },
          { icon: Palette, title: "FKDS 학습 경험", desc: "Feeling→Knowing→Doing→Sharing 순환 모델로 몰입형 학습 경험을 설계합니다." },
          { icon: Wand2, title: "원클릭 LMS 연동", desc: "SCORM/xAPI 표준 지원으로 기존 LMS에 생성된 콘텐츠를 원클릭으로 배포합니다." },
          { icon: Brain, title: "AI 자동 평가", desc: "학습 성과를 AI가 실시간으로 분석하고 맞춤형 피드백을 자동 생성합니다." },
          { icon: FileText, title: "다국어 콘텐츠", desc: "20개 이상 언어로 콘텐츠를 자동 번역하여 글로벌 교육을 지원합니다." },
        ]}
        screenshots={[
          { title: "콘텐츠 에디터", desc: "드래그 앤 드롭으로 이러닝 콘텐츠를 손쉽게 편집합니다.", gradient: "from-blue-100 to-cyan-50" },
          { title: "학습 분석 대시보드", desc: "학습자 진도와 성과를 실시간으로 모니터링합니다.", gradient: "from-purple-100 to-pink-50" },
          { title: "AI 생성 결과", desc: "멀티 AI가 자동 생성한 콘텐츠를 검토하고 승인합니다.", gradient: "from-green-100 to-emerald-50" },
        ]}
        aiFeatures={[
          { title: "자동 교수설계", desc: "학습 목표를 입력하면 CREATOR 7단계에 따라 전체 커리큘럼을 자동으로 설계합니다." },
          { title: "멀티모달 콘텐츠 생성", desc: "텍스트, 이미지, 영상, 인터랙티브 퀴즈를 하나의 프롬프트로 동시에 생성합니다." },
          { title: "적응형 학습 경로", desc: "학습자의 수준과 진도에 따라 AI가 실시간으로 학습 경로를 조정합니다." },
          { title: "Human-in-the-Loop", desc: "AI 생성물에 대한 전문가 검수 워크플로우로 품질을 보장합니다." },
        ]}
        ctaText={"AI로 이러닝 콘텐츠를\n지금 만들어보세요"}
      />
      <PortalCREATOR />
      <PortalFKDS />
    </>
  );
}
