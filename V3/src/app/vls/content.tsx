"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { Video, Captions, Users, MonitorPlay, Mic, HardDrive } from "lucide-react";

export default function VlsContent() {
  return (
    <SolutionPage
      code="VLS"
      name="Video Lecture System"
      tagline="시공간 제약 없는 실시간 화상 교육"
      subtitle={"HD/4K 라이브 스트리밍부터 AI 자막까지\n어디서든 최고의 교육을 경험합니다."}
      icon={Video}
      videoTitle="VLS 데모 영상"
      videoDesc="실시간 화상 교육의 새로운 경험을 확인하세요"
      features={[
        { icon: MonitorPlay, title: "HD/4K 라이브 스트리밍", desc: "초저지연 HD/4K 화질로 끊김 없는 실시간 강의를 제공합니다." },
        { icon: Captions, title: "AI 실시간 자막", desc: "20개 이상 언어로 실시간 자막을 자동 생성하여 글로벌 교육을 지원합니다." },
        { icon: Users, title: "소그룹 토론방", desc: "강의 중 소그룹 브레이크아웃 룸으로 협력 학습을 진행합니다." },
        { icon: Mic, title: "AI 음성 인식", desc: "강사 음성을 실시간으로 텍스트 변환하여 노트를 자동 생성합니다." },
        { icon: HardDrive, title: "자동 녹화 보관", desc: "모든 강의를 자동 녹화하고 클라우드에 안전하게 보관합니다." },
        { icon: Video, title: "화면 공유 & 화이트보드", desc: "화면 공유, 실시간 화이트보드, 폴링 등 인터랙티브 도구를 제공합니다." },
      ]}
      screenshots={[
        { title: "라이브 강의실", desc: "실시간 강의 진행 화면과 참여자 목록입니다.", gradient: "from-orange-100 to-amber-50" },
        { title: "AI 자막 패널", desc: "실시간으로 생성되는 다국어 자막 화면입니다.", gradient: "from-blue-100 to-sky-50" },
        { title: "녹화 관리", desc: "지난 강의 녹화를 검색하고 재생합니다.", gradient: "from-purple-100 to-violet-50" },
      ]}
      aiFeatures={[
        { title: "실시간 다국어 자막", desc: "강사의 음성을 AI가 실시간으로 인식하여 20개 이상 언어로 자막을 생성합니다." },
        { title: "자동 출석 관리", desc: "얼굴 인식과 참여도 분석으로 출석을 자동으로 체크합니다." },
        { title: "AI 강의 요약", desc: "강의가 끝나면 AI가 핵심 내용을 자동으로 요약하여 학습자에게 전달합니다." },
        { title: "참여도 분석", desc: "학습자의 집중도와 참여 패턴을 AI가 분석하여 강의 개선점을 제안합니다." },
      ]}
      ctaText={"실시간 교육의 혁신을\n지금 시작하세요"}
    />
  );
}
