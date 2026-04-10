// AI 맞춤 학습 경로 카드 컴포넌트
import { motion } from 'motion/react';
import { ArrowRight, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LearningPath {
  id: number;
  title: string;
  description: string;
  courseCount: number;
  duration: string;
  level: string;
  gradient: string;
}

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: '프론트엔드 엔지니어',
    description: 'React, TypeScript, Next.js를 마스터하고 실무 프로젝트를 완성하는 체계적 학습 경로',
    courseCount: 8,
    duration: '6개월',
    level: '초급 ~ 고급',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'AI/ML 엔지니어',
    description: 'Python 기초부터 딥러닝, NLP까지 AI 엔지니어로 성장하는 종합 커리큘럼',
    courseCount: 10,
    duration: '8개월',
    level: '초급 ~ 고급',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: '클라우드 아키텍트',
    description: 'AWS, Docker, Kubernetes를 활용한 클라우드 인프라 설계 및 운영 역량 확보',
    courseCount: 6,
    duration: '5개월',
    level: '중급 ~ 고급',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
];

interface LearningPathCardProps {
  path: LearningPath;
  index?: number;
}

export default function LearningPathCard({ path, index = 0 }: LearningPathCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
    >
      <Link
        to={`/paths`}
        className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden hover:border-[var(--color-border-hover)] hover:shadow-lg transition-all duration-200"
      >
        {/* 상단 그라디언트 바 */}
        <div className="h-2 w-full" style={{ background: path.gradient }} />

        <div className="p-5">
          <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors">
            {path.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">
            {path.description}
          </p>

          {/* 메타 */}
          <div className="flex items-center gap-4 mt-4 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" />
              {path.courseCount}개 강좌
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {path.duration}
            </span>
            <span>{path.level}</span>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center text-sm font-medium text-[var(--color-brand)] group-hover:gap-2 transition-all">
            경로 살펴보기
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
