import type { Translations } from "./en";

const ko: Translations = {
  // ── Header ──
  nav: {
    features: "기능",
    solutions: "솔루션",
    resources: "리소스",
    pricing: "가격",
    login: "로그인",
    cta: "무료 시작하기",
  },
  navFeatures: {
    aiContent: { label: "AI 콘텐츠 생성", desc: "GPT-4o · Claude · Gemini 기반 자동 생성" },
    creator: { label: "CREATOR 7단계", desc: "C→R→E→A→T→O→R 체계적 설계" },
    fkds: { label: "FKDS 모델", desc: "Feeling→Knowing→Doing→Sharing 순환" },
    assessment: { label: "자동 평가", desc: "AI 기반 학습 성과 자동 분석" },
    lms: { label: "LMS 연동", desc: "폴리텍 LMS 원클릭 통합" },
  },
  navSolutions: {
    teams: "팀별",
    instructor: { label: "교수자", desc: "강의 콘텐츠 자동 생성" },
    corporate: { label: "기업 교육", desc: "사내 교육 과정 설계" },
    vocational: { label: "직업훈련", desc: "NCS 기반 훈련 과정" },
    useCases: "사용 사례",
    lmsIntegration: { label: "LearnForm + LMS", desc: "LMS 플랫폼 통합" },
    aiIntegration: { label: "LearnForm + AI", desc: "멀티 AI 모델 활용" },
    scale: "규모별",
    enterprise: { label: "Enterprise", desc: "대규모 조직 맞춤 솔루션" },
  },
  navResources: {
    help: { label: "도움말", desc: "사용 가이드 및 튜토리얼" },
    community: { label: "커뮤니티", desc: "사용자 포럼 및 토론" },
    blog: { label: "블로그", desc: "최신 소식 및 활용 팁" },
    apiDocs: { label: "API 문서", desc: "개발자 레퍼런스" },
  },

  // ── Hero ──
  hero: {
    title1: "편집 시간은 줄이고.",
    title2: "창작에 더 집중하세요.",
    subtitle: "LearnForm와 함께 더 빠르게 영상을 만드세요.\n누구나 사용할 수 있는 올인원 AI 영상 편집기입니다.",
    download: "다운로드",
    tryFree: "무료 체험",
    noCreditCard: "신용카드 없이 시작 가능",
  },

  // ── Integrations ──
  integrations: {
    title: "Korea Polytechnics",
  },

  // ── Features ──
  features: {
    title: "필요한 모든 것, 한 곳에서",
    subtitle: "영상 편집 워크플로우를 간소화하는 강력한 AI 도구",
    learnMore: "자세히 보기 →",
    items: [
      { title: "텍스트 기반 편집", desc: "텍스트를 편집하듯 쉽게 영상을 편집하세요. 스크립트를 수정하면 영상이 자동으로 업데이트됩니다." },
      { title: "AI 음성 & 아바타", desc: "몇 초 만에 자연스러운 음성 나레이션과 AI 아바타를 생성하세요." },
      { title: "자동 자막", desc: "AI 음성 인식으로 다국어 자막을 자동으로 정확하게 생성합니다." },
      { title: "스마트 템플릿", desc: "전문적으로 디자인된 수백 개의 템플릿으로 프로젝트를 빠르게 시작하세요." },
    ],
  },

  // ── Showcase ──
  showcase: {
    title: "LearnForm를 직접 확인하세요",
    subtitle: "전문적인 영상을 얼마나 쉽게 만들 수 있는지 확인하세요",
    playLabel: "데모 영상 재생",
    stats: [
      { number: "1,000만+", label: "다운로드" },
      { number: "200+", label: "국가" },
      { number: "4.8★", label: "평균 평점" },
    ],
  },

  // ── Workflow ──
  workflow: {
    title: "3단계로 간단하게 영상 제작",
    subtitle: "아이디어에서 완성된 영상까지, 몇 시간이 아닌 몇 분이면 충분합니다",
    steps: [
      { title: "업로드 또는 녹화", desc: "영상, 오디오, 화면 녹화를 가져오거나\nAI로 처음부터 시작하세요." },
      { title: "AI로 편집", desc: "텍스트 기반 편집, 자동 자막, AI 음성으로\n콘텐츠를 완성하세요." },
      { title: "내보내기 & 공유", desc: "최대 4K 품질로 내보내고 YouTube, TikTok 등에 바로 공유하세요." },
    ],
  },

  // ── Solutions ──
  solutions: {
    title: "무엇을 만들든 저희가 함께합니다",
    subtitle: "콘텐츠 제작부터 비즈니스 마케팅 교육까지",
    learnMore: "자세히 보기 →",
    items: [
      { title: "콘텐츠 제작", desc: "AI 도구로 YouTube 영상, 소셜 미디어 콘텐츠, 팟캐스트를 빠르게 만드세요." },
      { title: "비즈니스 & 마케팅", desc: "전문적인 마케팅 영상, 제품 데모, 교육 자료를 제작하여 참여와 전환을 높이세요." },
      { title: "교육", desc: "자동 자막과 다국어 지원으로 대화형 교육 콘텐츠, 강의, 튜토리얼을 만드세요." },
    ],
  },

  // ── Testimonials ──
  testimonials: {
    title: "전 세계 크리에이터들이 사랑합니다",
    subtitle: "사용자들의 이야기를 들어보세요",
    items: [
      { quote: "LearnForm가 제 워크플로우를 완전히 바꿔놓았습니다. 몇 시간 걸리던 편집이 이제 몇 분이면 끝납니다. 텍스트 기반 편집은 정말 혁신적이에요!", name: "김서연", role: "유튜브 크리에이터 · 구독자 50만" },
      { quote: "마케팅 팀 리더로서 LearnForm는 전문적인 영상 콘텐츠를 대량으로 제작하는 데 큰 도움이 됩니다. AI 음성 기능만으로도 수천만 원의 나레이션 비용을 절약합니다.", name: "제임스 밀러", role: "마케팅 디렉터 · TechCorp" },
      { quote: "모든 온라인 강의에 LearnForm를 사용합니다. 자동 자막 생성과 다국어 지원 덕분에 전 세계 학생들이 제 콘텐츠를 이용할 수 있습니다.", name: "박마리아", role: "교수 · 서울대학교" },
    ],
  },

  // ── Privacy ──
  privacy: {
    title: "개인정보 보호를 최우선으로",
    subtitle: "데이터 보안이 최우선 과제입니다",
    learnMore: "데이터 보호에 대해 자세히 알아보기 →",
    items: [
      { title: "보안 시스템", desc: "모든 콘텐츠에 대한 엔드투엔드 암호화를 갖춘 엔터프라이즈급 보안 인프라." },
      { title: "데이터 프라이버시 준수", desc: "GDPR, CCPA 및 국제 데이터 보호 규정을 완벽하게 준수합니다." },
      { title: "사용자 권리", desc: "간편한 내보내기, 삭제, 투명성 도구로 데이터를 완전히 통제하세요." },
    ],
  },

  // ── Pricing ──
  pricing: {
    title: "모든 분을 위한 요금제",
    monthly: "월간",
    annual: "연간",
    save: "20% 할인",
    perMonth: "/월",
    getStarted: "시작하기",
    recommended: "추천",
    plans: [
      { name: "무료", desc: "영원히 무료", features: ["120분 텍스트 변환", "AI 음성 1만 자", "720p 내보내기", "워터마크 포함"] },
      { name: "라이트", desc: "가벼운 크리에이터용", features: ["600분 텍스트 변환", "AI 음성 5만 자", "1080p 내보내기", "워터마크 없음", "5GB 클라우드"] },
      { name: "스탠다드", desc: "가장 인기", features: ["2,000분 텍스트 변환", "AI 음성 20만 자", "4K 내보내기", "워터마크 없음", "50GB 클라우드", "우선 지원"] },
      { name: "비즈니스", desc: "팀용", features: ["무제한 텍스트 변환", "AI 음성 50만 자", "4K 내보내기", "워터마크 없음", "200GB 클라우드", "팀 협업", "커스텀 브랜딩", "전담 지원"] },
    ],
  },

  // ── FAQ ──
  faq: {
    title: "자주 묻는 질문",
    subtitle: "LearnForm에 대해 알아야 할 모든 것",
    items: [
      { q: "LearnForm는 정말 무료인가요?", a: "네! LearnForm는 월 120분의 텍스트 변환, AI 음성 생성, 기본 편집 기능을 포함한 넉넉한 무료 요금제를 제공합니다. 신용카드 없이 시작할 수 있습니다." },
      { q: "추가 텍스트 변환 시간을 구매할 수 있나요?", a: "물론입니다. 모든 요금제에서 추가 텍스트 변환 시간을 애드온으로 구매하거나, 더 높은 등급으로 업그레이드할 수 있습니다." },
      { q: "구독을 어떻게 취소하나요?", a: "계정 설정에서 언제든지 구독을 취소할 수 있습니다. 현재 결제 기간이 끝날 때까지 계속 이용할 수 있습니다." },
      { q: "LearnForm가 다른 영상 편집기와 다른 점은 무엇인가요?", a: "LearnForm만의 텍스트 기반 편집 방식으로 문서를 편집하듯 쉽게 영상을 편집할 수 있습니다. 음성 생성, 자막, 템플릿을 위한 강력한 AI 도구와 결합하여 편집 시간을 획기적으로 단축합니다." },
      { q: "LearnForm는 누구에게 적합한가요?", a: "LearnForm는 모든 규모의 콘텐츠 크리에이터, 교육자, 마케터, 기업을 위해 설계되었습니다. 유튜브 크리에이터, 기업 트레이너, 소셜 미디어 매니저 등 맞춤형 도구를 제공합니다." },
      { q: "LearnForm는 어떤 언어를 지원하나요?", a: "LearnForm는 영어, 한국어, 일본어, 중국어, 스페인어, 프랑스어, 독일어 등 20개 이상의 언어로 텍스트 변환과 자막을 지원합니다." },
    ],
  },

  // ── Download ──
  download: {
    title: "LearnForm 다운로드",
    version: "버전 3.8.1",
    downloadBtn: "다운로드",
    requirements: "macOS 11+, Windows 10+, Ubuntu 20.04+ 필요",
  },

  // ── CTA ──
  cta: {
    title: "지금 무료로 영상 제작을 시작하세요",
    subtitle: "수백만 크리에이터가 영상 편집에 LearnForm를 신뢰합니다",
    download: "다운로드",
    tryFree: "무료 체험",
  },

  // ── Footer ──
  footer: {
    tagline: "모두를 위한 AI 영상 편집기",
    product: "제품",
    productLinks: ["가격", "다운로드", "데이터 보호", "새 소식"],
    resources: "리소스",
    resourceLinks: ["커뮤니티", "Discord", "도움말 센터", "블로그"],
    company: "회사",
    companyLinks: ["회사 소개", "채용", "이용약관", "개인정보처리방침", "환불 정책"],
    copyright: "© 2026 NEWKL, Inc. All rights reserved.",
    language: "한국어",
  },

  // ── Theme ──
  theme: {
    light: "라이트",
    dark: "다크",
    color: "색상",
  },

  // ── Common ──
  scrollToTop: "맨 위로 스크롤",
};

export default ko;
