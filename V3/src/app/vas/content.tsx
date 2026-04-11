"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { FileVideo, FileSearch, Captions, Tag, Clock, Languages } from "lucide-react";

export default function VasContent() {
  return (
    <SolutionPage
      code="VAS"
      name="Video Auto Summary"
      tagline="AI 기반 영상 자동 요약"
      subtitle={"수천 시간의 영상을 AI가 분석하여\n핵심만 빠르게 파악합니다."}
      icon={FileVideo}
      videoTitle="VAS 데모 영상"
      videoDesc="영상 자동 요약이 작동하는 과정을 확인하세요"
      features={[
        { icon: FileSearch, title: "핵심 내용 추출", desc: "긴 영상에서 AI가 핵심 포인트를 자동으로 추출하여 요약합니다." },
        { icon: Tag, title: "챕터 자동 분할", desc: "주제 변화를 감지하여 영상을 자동으로 챕터 단위로 분할합니다." },
        { icon: Captions, title: "자동 자막 생성", desc: "음성을 텍스트로 변환하여 검색 가능한 자막을 자동 생성합니다." },
        { icon: Clock, title: "타임스탬프 인덱싱", desc: "키워드별 타임스탬프로 원하는 부분을 즉시 찾아갑니다." },
        { icon: Languages, title: "다국어 번역", desc: "요약본과 자막을 20개 이상 언어로 자동 번역합니다." },
        { icon: FileVideo, title: "하이라이트 클립", desc: "중요 장면을 자동으로 클립으로 만들어 공유합니다." },
      ]}
      screenshots={[
        { title: "요약 대시보드", desc: "영상별 요약 결과를 한눈에 확인합니다.", gradient: "from-pink-100 to-rose-50" },
        { title: "챕터 뷰어", desc: "자동 분할된 챕터를 탐색합니다.", gradient: "from-cyan-100 to-sky-50" },
        { title: "키워드 검색", desc: "영상 내 키워드를 검색하여 해당 구간으로 이동합니다.", gradient: "from-amber-100 to-yellow-50" },
      ]}
      aiFeatures={[
        { title: "멀티모달 분석", desc: "음성, 텍스트, 화면 변화를 동시에 분석하여 정확한 요약을 생성합니다." },
        { title: "중요도 스코어링", desc: "각 구간의 중요도를 AI가 점수화하여 핵심 부분을 하이라이트합니다." },
        { title: "자동 키워드 태깅", desc: "영상 콘텐츠를 분석하여 관련 키워드를 자동으로 태깅합니다." },
        { title: "트렌드 분석", desc: "대량의 영상 데이터에서 주제별 트렌드를 자동으로 파악합니다." },
      ]}
      ctaText={"영상 분석의 혁신을\n지금 경험하세요"}
    />
  );
}
