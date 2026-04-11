"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { HardHat, Wifi, AlertTriangle, BarChart3, Box, Camera } from "lucide-react";

export default function CmsContent() {
  return (
    <SolutionPage
      code="CMS"
      name="Construction Management"
      tagline="IoT + AI 기반 건설 현장 관리의 스마트화"
      subtitle={"센서 모니터링부터 안전 예측까지\n건설 현장의 디지털 전환을 실현합니다."}
      icon={HardHat}
      videoTitle="CMS 데모 영상"
      videoDesc="스마트 건설 현장 관리를 확인하세요"
      features={[
        { icon: Wifi, title: "IoT 실시간 모니터링", desc: "현장 전역의 IoT 센서 데이터를 실시간으로 수집하고 분석합니다." },
        { icon: AlertTriangle, title: "AI 안전 예측", desc: "사고 위험 요인을 사전에 감지하여 작업자 안전을 보장합니다." },
        { icon: BarChart3, title: "공정률 자동 산출", desc: "드론 영상과 센서 데이터로 공정 진행률을 자동으로 계산합니다." },
        { icon: Box, title: "BIM 데이터 통합", desc: "BIM 모델과 현장 데이터를 통합하여 설계 대비 시공 현황을 비교합니다." },
        { icon: Camera, title: "CCTV AI 분석", desc: "현장 CCTV 영상을 AI가 분석하여 안전 위반을 자동 감지합니다." },
        { icon: HardHat, title: "작업자 관리", desc: "출입 관리, 자격 확인, 안전 교육 이수 현황을 통합 관리합니다." },
      ]}
      screenshots={[
        { title: "현장 대시보드", desc: "현장 전체 현황을 한눈에 파악합니다.", gradient: "from-amber-100 to-yellow-50" },
        { title: "안전 모니터링", desc: "AI 안전 감지 결과를 실시간으로 확인합니다.", gradient: "from-red-100 to-rose-50" },
        { title: "BIM 뷰어", desc: "3D BIM 모델 위에 실시간 데이터를 오버레이합니다.", gradient: "from-blue-100 to-cyan-50" },
      ]}
      aiFeatures={[
        { title: "안전 사고 예측", desc: "기상, 작업 강도, 피로도 데이터를 종합하여 사고 위험을 사전에 예측합니다." },
        { title: "AI 영상 분석", desc: "CCTV와 드론 영상을 AI가 실시간 분석하여 안전 위반을 자동 감지합니다." },
        { title: "자동 공정 관리", desc: "작업 진행 상황을 AI가 자동으로 파악하여 공정 지연을 조기에 경고합니다." },
        { title: "자재 최적화", desc: "사용량 패턴을 분석하여 자재 발주 시점과 수량을 자동으로 최적화합니다." },
      ]}
      ctaText={"스마트 건설 관리를\n지금 시작하세요"}
    />
  );
}
