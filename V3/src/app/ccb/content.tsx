"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { MessageCircle, Bot, Languages, BarChart3, Headphones } from "lucide-react";
import ClaudeIcon from "@/components/icons/ClaudeIcon";
import { CCB_SCENES } from "@/data/scripts/video-scenes";

export default function CcbContent() {
  return (
    <SolutionPage
      code="CCB"
      name="Customer Care Bot"
      tagline="다국어 AI 챗봇으로 글로벌 고객 소통 혁신"
      subtitle={"20개 언어로 24/7 즉시 응답하는\nAI 고객 서비스를 경험하세요."}
      icon={MessageCircle}
      scenes={CCB_SCENES}
      videoSrc="/videos/ccb.mp4"
      videoTitle="CCB 데모 영상"
      videoDesc="AI 챗봇이 고객 문의를 처리하는 과정을 확인하세요"
      features={[
        { icon: Bot, title: "자연어 대화", desc: "자연어 이해(NLU) 기반으로 고객의 의도를 정확하게 파악하고 응답합니다." },
        { icon: Languages, title: "다국어 지원", desc: "20개 이상 언어를 자동 감지하여 고객의 모국어로 응답합니다." },
        { icon: ClaudeIcon, title: "감정 분석", desc: "고객의 감정 상태를 실시간으로 분석하여 응대 톤을 자동 조정합니다." },
        { icon: Headphones, title: "자동 에스컬레이션", desc: "복잡한 문의는 적절한 상담원에게 자동으로 연결합니다." },
        { icon: BarChart3, title: "분석 대시보드", desc: "문의 유형, 해결률, 고객 만족도를 실시간으로 분석합니다." },
        { icon: MessageCircle, title: "옴니채널 통합", desc: "웹, 앱, 카카오톡, 라인 등 모든 채널을 하나로 통합 관리합니다." },
      ]}
      screenshots={[
        { title: "대화 인터페이스", desc: "자연스러운 대화형 챗봇 인터페이스입니다.", mockup: "chat" },
        { title: "관리자 콘솔", desc: "실시간 대화 모니터링과 에스컬레이션을 관리합니다.", mockup: "monitor" },
        { title: "분석 리포트", desc: "고객 만족도와 응답 성과를 시각화합니다.", mockup: "analytics" },
      ]}
      aiFeatures={[
        { title: "의도 인식 엔진", desc: "문맥을 이해하여 단순 키워드 매칭이 아닌 의미 기반으로 고객 의도를 파악합니다." },
        { title: "실시간 감정 분석", desc: "고객의 텍스트에서 감정을 감지하여 불만 고객에게 우선 대응합니다." },
        { title: "자동 FAQ 학습", desc: "반복되는 문의를 AI가 자동으로 학습하여 답변 정확도를 지속 개선합니다." },
        { title: "대화 요약 생성", desc: "상담 종료 후 AI가 대화를 자동으로 요약하여 히스토리를 기록합니다." },
      ]}
      ctaText={"고객 서비스의 혁신을\n지금 시작하세요"}
    />
  );
}
