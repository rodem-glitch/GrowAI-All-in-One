"use client";
import SolutionPage from "@/components/solutions/SolutionPage";
import { Code2, Terminal, Bug, GitBranch, Shield, Flame } from "lucide-react";
import { CCS_SCENES } from "@/data/scripts/video-scenes";

export default function CcsContent() {
  return (
    <SolutionPage
      code="CCS"
      name="Claude Code Skill"
      tagline="AI 코드 어시스턴트로 개발 생산성의 도약"
      subtitle={"35개 전문가 슬래시 명령으로\n설계부터 배포까지 개발 전 과정을 가속화합니다."}
      icon={Code2}
      scenes={CCS_SCENES}
      videoSrc="/videos/ccs.mp4"
      videoTitle="CCS 데모 영상"
      videoDesc="AI 코드 어시스턴트가 개발을 혁신하는 과정을 확인하세요"
      features={[
        { icon: Terminal, title: "AI 코드 생성", desc: "자연어 설명만으로 프로덕션 레벨의 코드를 자동 생성합니다." },
        { icon: Bug, title: "자동 디버깅", desc: "에러를 분석하고 근본 원인을 파악하여 수정 코드를 제안합니다." },
        { icon: GitBranch, title: "코드 리뷰", desc: "PR 변경사항을 분석하여 잠재적 문제와 개선점을 자동으로 리뷰합니다." },
        { icon: Shield, title: "보안 감사", desc: "OWASP Top 10 기준으로 보안 취약점을 자동으로 스캔합니다." },
        { icon: Flame, title: "CI/CD 자동화", desc: "테스트, 빌드, 배포 파이프라인을 자동으로 구성합니다." },
        { icon: Code2, title: "35+ 슬래시 명령", desc: "/review, /ship, /qa 등 전문가 수준의 자동화 명령을 제공합니다." },
      ]}
      screenshots={[
        { title: "코드 에디터", desc: "AI가 실시간으로 코드를 추천하고 완성합니다.", mockup: "code" },
        { title: "리뷰 패널", desc: "자동 코드 리뷰 결과를 확인합니다.", mockup: "codereview" },
        { title: "보안 스캔 리포트", desc: "보안 취약점 스캔 결과를 시각화합니다.", mockup: "safety" },
      ]}
      aiFeatures={[
        { title: "컨텍스트 인식 코딩", desc: "프로젝트 전체 구조를 이해하고 일관된 코딩 스타일로 코드를 생성합니다." },
        { title: "근본 원인 분석", desc: "에러 로그를 분석하여 표면적 증상이 아닌 근본 원인을 파악합니다." },
        { title: "자동 테스트 생성", desc: "코드 변경사항에 대한 단위 테스트와 E2E 테스트를 자동으로 생성합니다." },
        { title: "성능 최적화 제안", desc: "코드 병목을 감지하고 구체적인 최적화 방안을 제안합니다." },
      ]}
      ctaText={"개발 생산성의 도약을\n지금 경험하세요"}
    />
  );
}
