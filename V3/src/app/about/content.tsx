"use client";

import {
  Building2,
  Target,
  Eye,
  Lightbulb,
  Heart,
  Shield,
  Users,
  Mail,
  ScrollText,
  BadgeCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  AvatarEntion,
  AvatarElliot,
  AvatarRodem,
  AvatarScarlet,
} from "@/components/icons/TeamAvatars";

/* ── 타입 정의 ── */
interface StatItem {
  value: string;
  labelKo: string;
  labelEn: string;
}

interface ValueItem {
  icon: React.ReactNode;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
}

interface TimelineItem {
  year: string;
  titleKo: string;
  titleEn: string;
  descKo: string;
  descEn: string;
}

interface TeamMember {
  initials: string;
  nameKo: string;
  nameEn: string;
  roleKo: string;
  roleEn: string;
  avatar: React.ReactNode;
}

/* ── 데이터 ── */
const stats: StatItem[] = [
  {
    value: "10M+",
    labelKo: "함께하는 사람들",
    labelEn: "People with us",
  },
  {
    value: "200+",
    labelKo: "닿은 나라",
    labelEn: "Countries reached",
  },
  {
    value: "50+",
    labelKo: "함께 사고하는 AI",
    labelEn: "AI models thinking together",
  },
  {
    value: "99.99%",
    labelKo: "멈추지 않는 약속",
    labelEn: "A promise that never stops",
  },
];

const values: ValueItem[] = [
  {
    icon: <Lightbulb className="w-7 h-7" />,
    titleKo: "아직 아무도 걷지 않은 길",
    titleEn: "The Road Not Yet Taken",
    descKo: "익숙한 것에 안주하지 않습니다.\n한 번도 없었던 것을 만들 때,\n비로소 혁신이라 부릅니다.",
    descEn: "We never settle for the familiar.\nOnly when we create what never existed\ndo we dare call it innovation.",
  },
  {
    icon: <Heart className="w-7 h-7" />,
    titleKo: "사람이 먼저입니다",
    titleEn: "People Come First",
    descKo: "기술은 수단이고, 사람이 목적입니다.\n만드는 사람의 떨림까지 이해할 때,\n도구는 비로소 동반자가 됩니다.",
    descEn: "Technology is the means; people are the purpose.\nWhen we understand the creator's heartbeat,\na tool becomes a companion.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    titleKo: "신뢰는 약속입니다",
    titleEn: "Trust Is a Promise",
    descKo: "맡겨진 데이터는 누군가의 이야기입니다.\n그 이야기를 지키는 일에는\n타협이 없습니다.",
    descEn: "Entrusted data is someone's story.\nIn protecting that story,\nthere is no compromise.",
  },
];

const timeline: TimelineItem[] = [
  {
    year: "2026",
    titleKo: "AI Video Generation, Veo 3.1 통합",
    titleEn: "AI Video Generation, Veo 3.1 Integration",
    descKo: "Gemini + Claude + Veo 3.1 멀티 AI 영상 자동 생성, 9개 솔루션 통합 플랫폼 완성",
    descEn: "Multi-AI video auto-generation with Gemini, Claude & Veo 3.1, 9 solutions unified",
  },
  {
    year: "2025",
    titleKo: "GrowAI 플랫폼 출시, 한국폴리텍대학 GrowAI LMS 수주",
    titleEn: "GrowAI Launch & Korea Polytechnics LMS Contract",
    descKo: "AI 영상 생성 통합 플랫폼 출시, 한국폴리텍대학 GrowAI LMS 서비스 제공",
    descEn: "AI video platform launched, GrowAI LMS service for Korea Polytechnics",
  },
  {
    year: "2024",
    titleKo: "한국폴리텍 스마트학습 수주, XRVerse 특허 취득",
    titleEn: "Korea Polytechnics LMS & XRVerse Patent",
    descKo: "국민체육진흥공단 교재 개발, 한글문화유산 콘텐츠 개발",
    descEn: "Sports instructor materials, Korean heritage content",
  },
  {
    year: "2023",
    titleKo: "국방부 실감형 콘텐츠, XR VERSE 마음 런칭",
    titleEn: "Defense XR Content & XR VERSE Mind",
    descKo: "마음건강 플랫폼 운영, 인천 메타캠퍼스 창작에디터 개발",
    descEn: "Mental health platform, Incheon MetaCampus editor",
  },
  {
    year: "2022",
    titleKo: "뉴클(주) 사명 변경, XRVERSE 런칭",
    titleEn: "Rebranded to NEWKL, XRVERSE Launch",
    descKo: "에듀테크 기업 리브랜딩, 메타버스 러닝 플랫폼 출시",
    descEn: "EdTech rebrand, metaverse learning platform released",
  },
  {
    year: "2020",
    titleKo: "XR Live 벤처기업 인증",
    titleEn: "XR Live Venture Certified",
    descKo: "XR Book 런칭, XR 학습/커뮤니케이션 플랫폼 특허 출원",
    descEn: "XR Book launch, XR platform patents filed",
  },
  {
    year: "2016",
    titleKo: "LEARN STORY 런칭",
    titleEn: "LEARN STORY Launched",
    descKo: "학습 플랫폼 론칭, 특허 2건 등록, 업계 최초 XR 교육 과정 개발",
    descEn: "Learning platform launch, 2 patents, first XR education course",
  },
  {
    year: "2009",
    titleKo: "회사 창립",
    titleEn: "Company Founded",
    descKo: "대기업 HRD 컨설팅 및 자체 과정개발 사업 시작",
    descEn: "Enterprise HRD consulting & course development",
  },
];

const team: TeamMember[] = [
  {
    initials: "E",
    nameKo: "Ention",
    nameEn: "Ention",
    roleKo: "CEO",
    roleEn: "CEO",
    avatar: <AvatarEntion />,
  },
  {
    initials: "E",
    nameKo: "Elliot",
    nameEn: "Elliot",
    roleKo: "Business Leader",
    roleEn: "Business Leader",
    avatar: <AvatarElliot />,
  },
  {
    initials: "R",
    nameKo: "Rodem",
    nameEn: "Rodem",
    roleKo: "Creator",
    roleEn: "Creator",
    avatar: <AvatarRodem />,
  },
  {
    initials: "S",
    nameKo: "Scarlet",
    nameEn: "Scarlet",
    roleKo: "Creator",
    roleEn: "Creator",
    avatar: <AvatarScarlet />,
  },
];

/* ── 카드 스타일 ── */
const card = [
  "bg-white dark:bg-gray-900",
  "border border-gray-200 dark:border-gray-800",
  "rounded-2xl p-6",
].join(" ");

/* ── 컴포넌트 ── */
export default function AboutContent() {
  const { locale } = useLanguage();
  const { colors } = useTheme();
  const isKo = locale === "ko";

  return (
    <div className="bg-white dark:bg-gray-950 pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* ── Hero ── */}
        <section className="text-center mb-20">
          <div
            className="inline-flex items-center justify-center
              w-16 h-16 rounded-2xl mb-6"
            style={{
              backgroundColor: colors.primary + "15",
            }}
          >
            <Building2
              className="w-8 h-8"
              style={{ color: colors.primary }}
            />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold
              text-gray-900 dark:text-white mb-4"
          >
            NEWKL Inc.
          </h1>
          <p
            className="text-lg text-gray-600
              dark:text-gray-400 max-w-xl mx-auto
              whitespace-pre-line"
          >
            {isKo
              ? "기술이 상상을 따라가던 시대는 끝났습니다.\n이제, 상상이 현실이 되는 순간을 만듭니다."
              : "The era of technology chasing imagination is over.\nNow, we create the moment imagination becomes reality."}
          </p>
        </section>

        {/* ── Mission & Vision ── */}
        <section
          className="grid grid-cols-1 md:grid-cols-2
            gap-6 mb-20"
        >
          <div className={card}>
            <div className="flex items-center gap-3 mb-4">
              <Target
                className="w-6 h-6"
                style={{ color: colors.primary }}
              />
              <h2
                className="text-xl font-semibold
                  text-gray-900 dark:text-white"
              >
                {isKo ? "미션" : "Mission"}
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400
                leading-relaxed whitespace-pre-line"
            >
              {isKo
                ? "누구에게나 이야기가 있습니다.\nAI는 그 이야기를 세상에 전하는\n가장 따뜻한 도구가 되어야 합니다."
                : "Everyone has a story to tell.\nAI should be the warmest tool\nto share it with the world."}
            </p>
          </div>

          <div className={card}>
            <div className="flex items-center gap-3 mb-4">
              <Eye
                className="w-6 h-6"
                style={{ color: colors.primary }}
              />
              <h2
                className="text-xl font-semibold
                  text-gray-900 dark:text-white"
              >
                {isKo ? "비전" : "Vision"}
              </h2>
            </div>
            <p
              className="text-gray-600 dark:text-gray-400
                leading-relaxed whitespace-pre-line"
            >
              {isKo
                ? "창작의 문턱을 낮추고,\n표현의 가능성을 넓혀,\n모두가 자신만의 빛을 비출 수 있는 세상."
                : "Lower the threshold of creation,\nexpand the possibilities of expression,\na world where everyone can shine."}
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section
          className="grid grid-cols-2 md:grid-cols-4
            gap-6 mb-20"
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className={`${card} text-center`}
            >
              <p
                className="text-4xl font-bold mb-1"
                style={{ color: colors.primary }}
              >
                {s.value}
              </p>
              <p
                className="text-sm text-gray-600
                  dark:text-gray-400"
              >
                {isKo ? s.labelKo : s.labelEn}
              </p>
            </div>
          ))}
        </section>

        {/* ── Values ── */}
        <section className="mb-20">
          <h2
            className="text-2xl font-bold text-center
              text-gray-900 dark:text-white mb-8"
          >
            {isKo ? "우리가 믿는 것" : "What We Believe"}
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3
              gap-6"
          >
            {values.map((v) => (
              <div key={v.titleEn} className={card}>
                <div
                  className="inline-flex items-center
                    justify-center w-12 h-12
                    rounded-xl mb-4"
                  style={{
                    backgroundColor:
                      colors.primary + "15",
                    color: colors.primary,
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  className="text-lg font-semibold
                    text-gray-900 dark:text-white mb-2"
                >
                  {isKo ? v.titleKo : v.titleEn}
                </h3>
                <p
                  className="text-gray-600
                    dark:text-gray-400
                    text-sm leading-relaxed
                    whitespace-pre-line"
                >
                  {isKo ? v.descKo : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="mb-20">
          <h2
            className="text-2xl font-bold text-center
              text-gray-900 dark:text-white mb-10"
          >
            {isKo ? "걸어온 길" : "The Path We've Walked"}
          </h2>
          <div
            className="border-l-2 ml-4 md:ml-8
              space-y-10"
            style={{
              borderColor: colors.primary + "30",
            }}
          >
            {timeline.map((item) => (
              <div
                key={item.year}
                className="relative pl-8"
              >
                {/* 타임라인 도트 */}
                <span
                  className="absolute -left-[9px] top-1
                    w-4 h-4 rounded-full border-2
                    bg-white dark:bg-gray-950"
                  style={{
                    borderColor: colors.primary,
                  }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: colors.primary }}
                >
                  {item.year}
                </span>
                <h3
                  className="text-lg font-semibold
                    text-gray-900 dark:text-white mt-1"
                >
                  {isKo ? item.titleKo : item.titleEn}
                </h3>
                <p
                  className="text-sm text-gray-600
                    dark:text-gray-400 mt-1"
                >
                  {isKo ? item.descKo : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 특허등록 및 지적 재산권 ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <ScrollText
              className="w-6 h-6"
              style={{ color: colors.primary }}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isKo
                ? "특허등록 및 지적 재산권"
                : "Patents & Intellectual Property"}
            </h2>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10 max-w-2xl mx-auto whitespace-pre-line">
            {isKo
              ? "XR 기반 학습 플랫폼 및 VR 실시간 커뮤니케이션 플랫폼의 특허와\n스마트 기술 기반의 학습 방법 및 학습 액티비티에 관한 지적 재산권을 보유하고 있습니다."
              : "We hold patents for XR-based learning platforms and VR real-time communication platforms,\nalong with intellectual property rights for smart technology-based learning methods."}
          </p>

          {/* 특허증 (4개) */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 ml-1">
            {isKo ? "특허증" : "Patents"}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">4{isKo ? "건" : " patents"}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { img: "/images/patent/img_patent_16.png", titleKo: "확장현실 기반의 메타버스 학습 플랫폼 시스템", titleEn: "XR Metaverse Learning Platform System", year: "2024" },
              { img: "/images/patent/img_patent_01.png", titleKo: "XR기반 학습 플랫폼 제공 장치 및 방법", titleEn: "XR-based Learning Platform Device & Method", year: "2021" },
              { img: "/images/patent/img_patent_02.png", titleKo: "XR기반 실시간 커뮤니케이션 플랫폼", titleEn: "XR Real-time Communication Platform", year: "2021" },
              { img: "/images/patent/img_patent_05.png", titleKo: "학습 프로그램 운영 방법", titleEn: "Learning Program Operation Method", year: "2019" },
            ].map((p, i) => (
              <div key={i} className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                  <img src={p.img} alt={p.titleKo} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>{p.year}</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 leading-snug line-clamp-2">
                    {isKo ? p.titleKo : p.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 학습 액티비티 특허 (2개) */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 ml-1">
            {isKo ? "학습 액티비티 특허" : "Learning Activity Patents"}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">2{isKo ? "건" : " patents"}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { img: "/images/patent/img_patent_03.png", titleKo: "학습 프로그램용 퍼스트 운영 시스템", titleEn: "Learning Program First Operating System", year: "2017" },
              { img: "/images/patent/img_patent_04.png", titleKo: "학습 프로그램 학습자 연관 운영 시스템", titleEn: "Learner-linked Program Operating System", year: "2016" },
            ].map((p, i) => (
              <div key={i} className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                  <img src={p.img} alt={p.titleKo} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>{p.year}</span>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 leading-snug line-clamp-2">
                    {isKo ? p.titleKo : p.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 상표등록증 (5개) */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 ml-1">
            {isKo ? "상표 및 서비스표 등록" : "Trademark & Service Mark Registrations"}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">5{isKo ? "건" : " marks"}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { img: "/images/patent/img_patent_06.jpg", name: "XRBOOK", year: "2021" },
              { img: "/images/patent/img_patent_07.jpg", name: "XRVERSE", year: "2023" },
              { img: "/images/patent/img_patent_08.jpg", name: "XRVERSE", year: "2022" },
              { img: "/images/patent/img_patent_09.jpg", name: "XRMICE", year: "2022" },
              { img: "/images/patent/img_patent_10.jpg", name: "LEARN STORY", year: "2016" },
            ].map((t, i) => (
              <div key={i} className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3 text-center">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{t.name}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 인증 현황 ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <BadgeCheck
              className="w-6 h-6"
              style={{ color: colors.primary }}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isKo ? "인증 현황" : "Certifications & Awards"}
            </h2>
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
            {isKo
              ? "문화체육관광부장관상 수상 및 기업부설연구소, 벤처기업 인증을 받았습니다."
              : "Awarded by the Minister of Culture, Sports and Tourism, with certified R&D center and venture enterprise status."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { img: "/images/certification/img_patent_11.png", titleKo: "문화체육관광부장관상", titleEn: "Minister of Culture Award", year: "2022" },
              { img: "/images/certification/img_patent_12.png", titleKo: "기업부설연구소 인정서", titleEn: "Corporate R&D Center", year: "2022" },
              { img: "/images/certification/img_patent_13.png", titleKo: "벤처기업확인서", titleEn: "Venture Enterprise", year: "2022" },
              { img: "/images/certification/img_patent_14.png", titleKo: "기술평가 우수기업 T-4", titleEn: "Tech Excellence T-4", year: "2020" },
              { img: "/images/certification/img_patent_15.png", titleKo: "인적자원개발 대상", titleEn: "HRD Excellence Award", year: "2020" },
            ].map((c, i) => (
              <div key={i} className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                  <img src={c.img} alt={c.titleKo} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
                    {isKo ? c.titleKo : c.titleEn}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">{c.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section className="mb-20">
          <h2
            className="text-2xl font-bold text-center
              text-gray-900 dark:text-white mb-8"
          >
            <Users
              className="w-6 h-6 inline-block mr-2
                align-text-bottom"
              style={{ color: colors.primary }}
            />
            {isKo ? "우리 팀" : "Our Team"}
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2
              md:grid-cols-4 gap-6"
          >
            {team.map((m) => (
              <div
                key={m.nameEn}
                className={`${card} text-center`}
              >
                {/* 픽사 스타일 아바타 */}
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  {m.avatar}
                </div>
                <h3
                  className="font-semibold
                    text-gray-900 dark:text-white"
                >
                  {isKo ? m.nameKo : m.nameEn}
                </h3>
                <p
                  className="text-sm text-gray-600
                    dark:text-gray-400 mt-1"
                >
                  {isKo ? m.roleKo : m.roleEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`${card} text-center`}>
          <h2
            className="text-2xl font-bold
              text-gray-900 dark:text-white mb-3"
          >
            {isKo
              ? "당신의 가능성이, 세상을 바꿉니다"
              : "Your Potential Changes the World"}
          </h2>
          <p
            className="text-gray-600 dark:text-gray-400
              mb-6 max-w-md mx-auto"
          >
            {isKo
              ? "AI가 열어갈 내일, 그 첫 페이지를"
                + " 함께 쓸 동료를 찾습니다."
              : "We're looking for those who dream of"
                + " writing the first page of tomorrow."}
          </p>
          <div
            className="flex flex-col sm:flex-row
              items-center justify-center gap-4"
          >
            <a
              href="/careers"
              className="inline-flex items-center
                px-6 py-3 rounded-xl text-white
                font-medium transition-opacity
                hover:opacity-90"
              style={{
                backgroundColor: colors.primary,
              }}
            >
              {isKo ? "채용 공고 보기" : "View Careers"}
            </a>
            <a
              href="mailto:we@newkl.net"
              className="inline-flex items-center gap-2
                px-6 py-3 rounded-xl border
                border-gray-200 dark:border-gray-800
                text-gray-700 dark:text-gray-300
                font-medium transition-colors
                hover:bg-gray-50
                dark:hover:bg-gray-800"
            >
              <Mail className="w-4 h-4" />
              we@newkl.net
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
