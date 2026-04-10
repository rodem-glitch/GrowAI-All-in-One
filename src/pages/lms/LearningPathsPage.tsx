// AI 맞춤 학습 경로 페이지 (edX/LinkedIn Learning 스타일)
import { useState } from 'react';
import { motion } from 'motion/react';
import LearningPathCard from '../../components/course/LearningPathCard';
import type { LearningPath } from '../../components/course/LearningPathCard';

/* ── 목업 학습 경로 데이터 ── */
const mockPaths: LearningPath[] = [
  {
    id: 1,
    title: 'AI/ML 엔지니어 입문 과정',
    description:
      'Python 기초부터 머신러닝 핵심 알고리즘까지, AI 엔지니어로 성장하기 위한 체계적 커리큘럼입니다.',
    courseCount: 6,
    duration: '120시간',
    level: '입문',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: '풀스택 웹 개발자 트랙',
    description:
      'React, Node.js, 데이터베이스 설계를 포함한 실무 중심 풀스택 개발 경로입니다.',
    courseCount: 8,
    duration: '160시간',
    level: '중급',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 3,
    title: '클라우드 아키텍트 전문가',
    description:
      'GCP, AWS 기반 클라우드 인프라 설계부터 보안, 비용 최적화까지 고급 아키텍처 역량을 키웁니다.',
    courseCount: 5,
    duration: '140시간',
    level: '고급',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 4,
    title: '데이터 분석가 첫걸음',
    description:
      'Excel, SQL, Python을 활용한 데이터 수집, 정제, 시각화 기초를 단계별로 학습합니다.',
    courseCount: 5,
    duration: '90시간',
    level: '입문',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

const LEVEL_FILTERS = ['전체', '입문', '중급', '고급'] as const;

export default function LearningPathsPage() {
  const [activeLevel, setActiveLevel] = useState<string>('전체');

  const filteredPaths =
    activeLevel === '전체'
      ? mockPaths
      : mockPaths.filter((p) => p.level === activeLevel);

  return (
    <section className="container-page py-12">
      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
          AI 맞춤 학습 경로
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
          목표에 맞는 커리큘럼을 선택하고, 단계별로 역량을 성장시키세요.
        </p>
      </motion.div>

      {/* ── 레벨 필터 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        {LEVEL_FILTERS.map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={[
              'px-4 py-1.5 text-sm font-medium rounded-full border transition-colors duration-150 cursor-pointer',
              activeLevel === level
                ? 'bg-[var(--color-brand)] text-white border-transparent'
                : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]',
            ].join(' ')}
          >
            {level}
          </button>
        ))}
      </motion.div>

      {/* ── 학습 경로 그리드 ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPaths.map((path, i) => (
          <LearningPathCard key={path.id} path={path} index={i} />
        ))}
      </div>

      {/* 빈 상태 */}
      {filteredPaths.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-[var(--color-text-muted)] mt-12"
        >
          해당 레벨의 학습 경로가 없습니다.
        </motion.p>
      )}
    </section>
  );
}
