"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { Factory, Brain, Gauge, AlertTriangle, Cpu, BarChart3 } from "lucide-react";

export default function MapContent() {
  return (
    <SolutionPage
      code="MAP"
      name="Manufacturing AI Platform"
      tagline="생산 공정의 지능화와 품질 최적화"
      subtitle={"실시간 센서 데이터 분석부터 불량 예측까지\nAI가 스마트 팩토리를 완성합니다."}
      icon={Factory}
      videoTitle="MAP 데모 영상"
      videoDesc="AI가 제조 공정을 혁신하는 과정을 확인하세요"
      features={[
        { icon: Brain, title: "AI 품질 예측", desc: "실시간 센서 데이터를 분석하여 불량 발생을 사전에 예측하고 경고합니다." },
        { icon: Gauge, title: "공정 최적화", desc: "AI가 생산 파라미터를 실시간으로 조정하여 수율을 극대화합니다." },
        { icon: AlertTriangle, title: "예지보전", desc: "설비 이상 징후를 조기에 감지하여 가동 중단을 최소화합니다." },
        { icon: Cpu, title: "디지털 트윈", desc: "가상 환경에서 공정을 시뮬레이션하여 최적 조건을 도출합니다." },
        { icon: BarChart3, title: "실시간 모니터링", desc: "공장 전체의 생산 현황을 실시간 대시보드로 한눈에 파악합니다." },
        { icon: Factory, title: "다공장 통합 관리", desc: "여러 공장의 데이터를 하나의 플랫폼에서 통합 관리합니다." },
      ]}
      screenshots={[
        { title: "실시간 대시보드", desc: "공장 전체 현황을 실시간으로 모니터링합니다.", gradient: "from-emerald-100 to-teal-50" },
        { title: "불량 예측 화면", desc: "AI가 예측한 불량 위험을 시각화합니다.", gradient: "from-red-100 to-orange-50" },
        { title: "공정 분석 리포트", desc: "수율, OEE 등 핵심 지표를 분석합니다.", gradient: "from-blue-100 to-cyan-50" },
      ]}
      aiFeatures={[
        { title: "실시간 불량 감지", desc: "센서 데이터를 밀리초 단위로 분석하여 불량 징후를 즉시 감지합니다." },
        { title: "수율 최적화 엔진", desc: "수천 개의 변수를 동시에 분석하여 최적의 생산 파라미터를 도출합니다." },
        { title: "예측 정비 스케줄링", desc: "설비 수명 예측 모델로 최적의 정비 시점을 자동으로 스케줄링합니다." },
        { title: "자동 리포트 생성", desc: "일간/주간 생산 리포트를 AI가 자동으로 작성하여 배포합니다." },
      ]}
      ctaText={"스마트 팩토리의 시작을\n지금 경험하세요"}
    />
  );
}
