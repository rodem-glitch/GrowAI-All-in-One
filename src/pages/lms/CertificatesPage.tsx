// 자격증 페이지 — 취득 자격증 / 진행중 자격증
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Award, Download } from 'lucide-react';
import Badge from '../../components/common/Badge';

/* ── 취득 자격증 데이터 ── */
interface EarnedCertificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  grade: string;
  color: string;
}

const earnedCertificates: EarnedCertificate[] = [
  {
    id: 1,
    title: 'React 프론트엔드 전문가',
    issuer: 'GrowAI Academy',
    date: '2026-03-28',
    grade: 'A+',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'Spring Boot 백엔드 개발자',
    issuer: 'GrowAI Academy',
    date: '2026-03-15',
    grade: 'A',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

/* ── 진행중 자격증 데이터 ── */
interface InProgressCertificate {
  id: number;
  title: string;
  progress: number;
  remainingCourses: number;
  color: string;
}

const inProgressCertificates: InProgressCertificate[] = [
  {
    id: 3,
    title: 'AI/ML 엔지니어링 인증',
    progress: 42,
    remainingCourses: 2,
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

/* ── 카드 공통 스타일 ── */
const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: 12,
};

/* ── 애니메이션 프리셋 ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function CertificatesPage() {
  return (
    <div className="container-page py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          GrowAI
        </Link>
        <ChevronRight size={14} />
        <Link to="/lms" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
          LMS
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-text)' }}>자격증</span>
      </nav>

      {/* 헤더 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
        자격증
      </h1>

      {/* 취득 자격증 */}
      <motion.section {...fadeUp} transition={{ duration: 0.4 }} className="mb-10">
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          취득한 자격증 ({earnedCertificates.length})
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {earnedCertificates.map((cert) => (
            <div key={cert.id} className="overflow-hidden" style={cardStyle}>
              {/* 상단 색상 배너 */}
              <div
                className="h-24 flex items-center justify-center"
                style={{ background: cert.color }}
              >
                <Award size={36} color="#ffffff" />
              </div>

              {/* 정보 */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                    {cert.title}
                  </h3>
                  <Badge variant="success">{cert.grade}</Badge>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {cert.issuer}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  취득일: {cert.date}
                </p>

                {/* 다운로드 버튼 */}
                <button
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                  }}
                >
                  <Download size={14} />
                  인증서 다운로드
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 진행중 자격증 */}
      <motion.section {...fadeUp} transition={{ duration: 0.4, delay: 0.15 }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
          진행중인 자격증 ({inProgressCertificates.length})
        </h2>
        <div className="flex flex-col gap-4">
          {inProgressCertificates.map((cert) => (
            <div key={cert.id} className="flex flex-col sm:flex-row gap-4 p-4" style={cardStyle}>
              {/* 아이콘 */}
              <div
                className="w-full sm:w-40 h-24 sm:h-auto rounded-lg flex items-center justify-center shrink-0"
                style={{ background: cert.color }}
              >
                <Award size={28} color="#ffffff" />
              </div>

              {/* 정보 */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="warning">진행중</Badge>
                  </div>
                  <h3 className="font-semibold text-base" style={{ color: 'var(--color-text)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                    남은 필수 과정: {cert.remainingCourses}개
                  </p>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>진행률</span>
                    <span className="font-medium" style={{ color: 'var(--color-warning)' }}>
                      {cert.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${cert.progress}%`, backgroundColor: 'var(--color-warning)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
