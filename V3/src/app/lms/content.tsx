"use client";

import SolutionPage from "@/components/solutions/SolutionPage";
import { LayoutDashboard, Route, Users, BarChart3, BookOpen, Award } from "lucide-react";
import { LMS_SCENES } from "@/data/scripts/video-scenes";

export default function LmsContent() {
  return (
    <SolutionPage
      code="LMS"
      name="Learning Management System"
      tagline="체계적인 학습 관리와 진도 추적"
      subtitle={"학습자별 맞춤 커리큘럼 설계부터\n실시간 성과 분석까지 한 곳에서."}
      icon={LayoutDashboard}
      scenes={LMS_SCENES}
      videoSrc="/videos/lms.mp4"
      videoTitle="LMS 데모 영상"
      videoDesc="학습 관리의 새로운 기준을 확인하세요"
      features={[
        { icon: Route, title: "맞춤 커리큘럼", desc: "학습자 수준에 따라 AI가 최적의 학습 경로를 자동으로 설계합니다." },
        { icon: BarChart3, title: "실시간 진도 추적", desc: "학습 진도, 완료율, 성과를 실시간 대시보드로 모니터링합니다." },
        { icon: Users, title: "팀 협업 학습", desc: "소그룹 과제, 토론, 피어 리뷰를 통한 협력 학습을 지원합니다." },
        { icon: BookOpen, title: "SCORM/xAPI 지원", desc: "표준 규격 콘텐츠를 원클릭으로 가져오고 내보낼 수 있습니다." },
        { icon: Award, title: "자격증 관리", desc: "이수증, 자격증을 자동 발급하고 유효기간을 관리합니다." },
        { icon: LayoutDashboard, title: "관리자 대시보드", desc: "조직 전체의 학습 현황을 한눈에 파악하는 통합 대시보드입니다." },
      ]}
      screenshots={[
        { title: "학습자 대시보드", desc: "내 학습 진도와 다음 과정을 한눈에 확인합니다.", mockup: "dashboard" },
        { title: "과정 관리", desc: "드래그 앤 드롭으로 커리큘럼을 쉽게 구성합니다.", mockup: "timeline" },
        { title: "성과 리포트", desc: "학습 성과를 다양한 차트로 시각화합니다.", mockup: "analytics" },
      ]}
      aiFeatures={[
        { title: "AI 학습 경로 추천", desc: "학습자의 수준과 목표에 맞는 최적의 커리큘럼을 AI가 자동으로 추천합니다." },
        { title: "자동 성과 분석", desc: "학습 데이터를 AI가 분석하여 취약 영역을 파악하고 보충 학습을 제안합니다." },
        { title: "스마트 알림", desc: "학습 이탈 징후를 AI가 감지하여 적시에 리마인더를 발송합니다." },
        { title: "자동 리포트 생성", desc: "주간/월간 학습 현황 리포트를 AI가 자동으로 작성하여 관리자에게 전달합니다." },
      ]}
      ctaText={"학습 관리의 혁신을\n지금 시작하세요"}
    />
  );
}
