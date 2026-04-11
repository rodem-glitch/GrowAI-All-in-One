"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { Globe, Gauge, Shield, BarChart3, Zap, Server } from "lucide-react";
import { CDN_SCENES } from "@/data/scripts/video-scenes";

export default function CdnContent() {
  return (
    <SolutionPage
      code="CDN"
      name="Content Delivery Network"
      tagline="글로벌 엣지 캐싱으로 끊김 없는 미디어 경험"
      subtitle={"42개국 엣지 서버로 초저지연 콘텐츠 전송.\n어디서든 빠르고 안전한 미디어 경험."}
      icon={Globe}
      scenes={CDN_SCENES}
      videoSrc="/videos/cdn.mp4"
      videoTitle="CDN 데모 영상"
      videoDesc="글로벌 콘텐츠 전송의 속도를 체감하세요"
      features={[
        { icon: Zap, title: "초저지연 전송", desc: "42개국 엣지 서버를 통해 밀리초 단위의 콘텐츠 전송을 보장합니다." },
        { icon: Gauge, title: "적응형 스트리밍", desc: "네트워크 환경에 따라 비트레이트를 자동 조정하여 끊김 없는 재생을 제공합니다." },
        { icon: Shield, title: "DRM 보안", desc: "콘텐츠 무단 복제를 방지하는 DRM 보안 기능을 내장합니다." },
        { icon: BarChart3, title: "트래픽 분석", desc: "실시간 트래픽, 대역폭, 응답 시간을 모니터링하는 분석 대시보드입니다." },
        { icon: Server, title: "오리진 쉴드", desc: "캐시 히트율을 극대화하여 오리진 서버 부하를 최소화합니다." },
        { icon: Globe, title: "멀티 CDN 전략", desc: "복수 CDN을 자동으로 전환하여 가용성 99.99%를 보장합니다." },
      ]}
      screenshots={[
        { title: "글로벌 트래픽 맵", desc: "전 세계 엣지 서버의 트래픽을 실시간으로 시각화합니다.", mockup: "globe" },
        { title: "성능 모니터링", desc: "응답 시간, 캐시 히트율 등 핵심 지표를 추적합니다.", mockup: "analytics" },
        { title: "보안 대시보드", desc: "DDoS 방어, SSL 인증서 관리 현황을 확인합니다.", mockup: "safety" },
      ]}
      aiFeatures={[
        { title: "AI 트래픽 예측", desc: "과거 패턴을 학습하여 트래픽 급증을 사전에 예측하고 리소스를 자동 확장합니다." },
        { title: "스마트 캐싱", desc: "AI가 콘텐츠 인기도를 분석하여 캐싱 전략을 실시간으로 최적화합니다." },
        { title: "이상 트래픽 감지", desc: "정상/비정상 트래픽을 AI가 판별하여 DDoS 공격을 자동으로 차단합니다." },
        { title: "비용 최적화", desc: "트래픽 패턴을 분석하여 CDN 비용을 자동으로 최적화하는 인사이트를 제공합니다." },
      ]}
      ctaText={"글로벌 콘텐츠 전송을\n지금 시작하세요"}
    />
  );
}
