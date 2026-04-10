// 과정 상세 페이지 (Coursera/Udemy 스타일 2nd depth)
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Clock,
  BookOpen,
  BarChart3,
  Award,
  Heart,
  Share2,
  Play,
  Users,
  Star,
  ChevronDown,
} from 'lucide-react';
import { courses } from '../../data/courses';
import type { Course } from '../../data/courses';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import RatingStars from '../../components/course/RatingStars';

/* ── 커리큘럼 mock 데이터 ── */
function generateCurriculum(course: Course) {
  const sections = [
    { title: '시작하기', lessons: ['강의 소개 및 학습 목표', '개발 환경 설정', '기본 개념 이해'] },
    { title: '핵심 개념', lessons: ['기초 문법과 구조', '핵심 패턴 학습', '실습: 첫 번째 프로젝트', '퀴즈: 핵심 개념 점검'] },
    { title: '심화 학습', lessons: ['고급 기법 소개', '성능 최적화 전략', '실습: 중급 프로젝트', '코드 리뷰 및 피드백'] },
    { title: '실전 프로젝트', lessons: ['프로젝트 기획 및 설계', '핵심 기능 구현', '테스트 및 디버깅', '배포와 운영'] },
    { title: '마무리', lessons: ['전체 복습 및 정리', '다음 단계 학습 가이드', `${course.title} 수료 시험`] },
  ];
  return sections;
}

/* ── 수강후기 mock 데이터 ── */
const mockReviews = [
  {
    id: 1,
    name: '이현우',
    rating: 5,
    date: '2026-03-15',
    content: '실무에서 바로 적용할 수 있는 내용들이 많아서 정말 유익했습니다. 강사님의 설명이 명확하고 예제도 잘 구성되어 있어서 이해하기 쉬웠습니다.',
  },
  {
    id: 2,
    name: '박소영',
    rating: 4.5,
    date: '2026-03-02',
    content: '전반적으로 만족스러운 강의입니다. 기초부터 차근차근 설명해주셔서 초보자도 따라갈 수 있었습니다. 다만 일부 심화 내용이 조금 더 있었으면 합니다.',
  },
  {
    id: 3,
    name: '정민재',
    rating: 5,
    date: '2026-02-18',
    content: '이 분야 강의 중 최고라고 생각합니다. 체계적인 커리큘럼과 풍부한 실습 자료 덕분에 실력이 많이 향상되었습니다. 강력 추천합니다.',
  },
];

/* ── 탭 타입 ── */
type TabKey = 'intro' | 'curriculum' | 'reviews' | 'instructor';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'intro', label: '소개' },
  { key: 'curriculum', label: '커리큘럼' },
  { key: 'reviews', label: '수강후기' },
  { key: 'instructor', label: '강사' },
];

/* ── 아코디언 섹션 ── */
function AccordionSection({
  title,
  lessons,
  index,
}: {
  title: string;
  lessons: string[];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer"
        style={{ backgroundColor: open ? 'var(--color-bg-secondary)' : 'var(--color-bg)' }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              backgroundColor: 'var(--color-brand)',
              color: '#ffffff',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {lessons.length}개 강의
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} style={{ color: 'var(--color-text-secondary)' }} />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="px-4 pb-3">
              {lessons.map((lesson, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-2 text-sm"
                  style={{
                    borderTop: i > 0 ? '1px solid var(--color-border)' : undefined,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <Play size={14} style={{ color: 'var(--color-brand)' }} />
                  <span className="flex-1">{lesson}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {5 + Math.floor(Math.random() * 20)}분
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 리뷰 카드 ── */
function ReviewCard({ review }: { review: (typeof mockReviews)[0] }) {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={review.name} size="md" />
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
            {review.name}
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {review.date}
          </p>
        </div>
        <RatingStars rating={review.rating} size="sm" />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {review.content}
      </p>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>('intro');
  const [liked, setLiked] = useState(false);

  const course = courses.find((c) => c.id === Number(id));

  // 404 fallback
  if (!course) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          과정을 찾을 수 없습니다
        </h1>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          요청하신 과정이 존재하지 않거나 삭제되었습니다.
        </p>
        <Link to="/explore">
          <Button variant="primary">탐색 페이지로 이동</Button>
        </Link>
      </div>
    );
  }

  const curriculum = generateCurriculum(course);
  const totalLessons = curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <>
      {/* ── Hero 섹션 ── */}
      <section
        className="py-10 lg:py-14"
        style={{ backgroundColor: '#0f172a' }}
      >
        <div className="container-page">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6">
            <Link
              to="/explore"
              className="hover:underline"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              탐색
            </Link>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{course.category}</span>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{course.title}</span>
          </nav>

          <div className="max-w-3xl">
            {/* 배지 */}
            {course.badge && (
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded mb-4"
                style={{
                  backgroundColor: 'var(--color-brand)',
                  color: '#ffffff',
                }}
              >
                {course.badge}
              </span>
            )}

            {/* 제목 */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              {course.title}
            </h1>

            {/* 설명 */}
            <p className="text-base lg:text-lg mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {course.description}
            </p>

            {/* 평점 + 수강생 */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm" style={{ color: 'var(--color-warning)' }}>
                  {course.rating.toFixed(1)}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(course.rating) ? 'var(--color-warning)' : 'rgba(255,255,255,0.2)'}
                      style={{ color: i < Math.round(course.rating) ? 'var(--color-warning)' : 'rgba(255,255,255,0.2)' }}
                    />
                  ))}
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  ({course.reviewCount.toLocaleString()}개 평가)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {course.students.toLocaleString()}명 수강
                </span>
              </div>
            </div>

            {/* 강사 */}
            <div className="flex items-center gap-3">
              <Avatar name={course.instructor} size="md" />
              <div>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  강사
                </p>
                <p className="font-semibold text-sm" style={{ color: '#ffffff' }}>
                  {course.instructor}
                </p>
              </div>
            </div>

            {/* 모바일 CTA */}
            <div className="flex items-center gap-3 mt-8 lg:hidden">
              <Button variant="primary" size="lg" fullWidth>
                수강 신청
              </Button>
              <button
                className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border cursor-pointer"
                style={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: liked ? 'var(--color-error)' : 'rgba(255,255,255,0.6)',
                }}
                onClick={() => setLiked(!liked)}
              >
                <Heart size={20} fill={liked ? 'var(--color-error)' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content 섹션 (2/3 + 1/3) ── */}
      <section className="container-page py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT (2/3) */}
          <div className="flex-1 min-w-0">
            {/* 탭 네비게이션 */}
            <div
              className="flex border-b mb-8 overflow-x-auto"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className="px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors relative"
                  style={{
                    color:
                      activeTab === tab.key
                        ? 'var(--color-brand)'
                        : 'var(--color-text-secondary)',
                  }}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="course-detail-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: 'var(--color-brand)' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* ── 소개 탭 ── */}
                {activeTab === 'intro' && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: 'var(--color-text)' }}
                    >
                      과정 소개
                    </h2>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {course.description}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      이 과정은 {course.level} 수준의 학습자를 대상으로 하며, 총 {course.duration}의 체계적인 커리큘럼으로 구성되어 있습니다.
                      {course.lessonsCount}개의 강의를 통해 이론과 실습을 균형 있게 학습할 수 있습니다.
                    </p>

                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: 'var(--color-text)' }}
                    >
                      이런 분들에게 추천합니다
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {[
                        `${course.category} 분야에 관심이 있는 분`,
                        '체계적인 학습 로드맵이 필요한 분',
                        '실무 프로젝트 경험을 쌓고 싶은 분',
                        '자격증 또는 포트폴리오를 준비하는 분',
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span
                            className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: 'var(--color-brand)' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: 'var(--color-text)' }}
                    >
                      학습 후 기대 효과
                    </h3>
                    <ul className="space-y-2">
                      {[
                        `${course.category} 핵심 개념에 대한 깊은 이해`,
                        '실무에서 바로 활용 가능한 기술 역량',
                        '포트폴리오에 추가할 수 있는 프로젝트 결과물',
                        '수료증 취득을 통한 역량 증명',
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <span
                            className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: 'var(--color-success)' }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ── 커리큘럼 탭 ── */}
                {activeTab === 'curriculum' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        커리큘럼
                      </h2>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {curriculum.length}개 섹션 / {totalLessons}개 강의 / {course.duration}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {curriculum.map((section, i) => (
                        <AccordionSection
                          key={i}
                          title={section.title}
                          lessons={section.lessons}
                          index={i}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── 수강후기 탭 ── */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        수강후기
                      </h2>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        총 {course.reviewCount.toLocaleString()}개 평가
                      </p>
                    </div>

                    {/* 평균 평점 요약 */}
                    <div
                      className="flex items-center gap-6 p-6 rounded-lg mb-6"
                      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                    >
                      <div className="text-center">
                        <p
                          className="text-4xl font-bold"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {course.rating.toFixed(1)}
                        </p>
                        <RatingStars rating={course.rating} size="md" />
                        <p
                          className="text-xs mt-1"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          {course.reviewCount.toLocaleString()}개 평가
                        </p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const pct =
                            star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : star === 2 ? 2 : 1;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span
                                className="text-xs w-3 text-right"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {star}
                              </span>
                              <div
                                className="flex-1 h-2 rounded-full overflow-hidden"
                                style={{ backgroundColor: 'var(--color-border)' }}
                              >
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${pct}%`,
                                    backgroundColor: 'var(--color-warning)',
                                  }}
                                />
                              </div>
                              <span
                                className="text-xs w-8"
                                style={{ color: 'var(--color-text-muted)' }}
                              >
                                {pct}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* 리뷰 목록 */}
                    <div className="space-y-4">
                      {mockReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── 강사 탭 ── */}
                {activeTab === 'instructor' && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-6"
                      style={{ color: 'var(--color-text)' }}
                    >
                      강사 소개
                    </h2>
                    <div className="flex items-start gap-5">
                      <Avatar name={course.instructor} size="xl" />
                      <div className="flex-1">
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ color: 'var(--color-text)' }}
                        >
                          {course.instructor}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                          {course.category} 전문 강사
                        </p>
                        <p
                          className="text-sm leading-relaxed mb-6"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          10년 이상의 실무 경험과 5년간의 강의 경력을 보유한 {course.category} 분야 전문가입니다.
                          현업에서의 풍부한 경험을 바탕으로 실무 중심의 교육을 제공합니다.
                          수강생들이 실질적인 역량을 갖출 수 있도록 체계적인 커리큘럼을 설계하고 있습니다.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {[
                            { label: '수강생', value: `${(course.students * 1.5).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}+` },
                            { label: '평균 평점', value: course.rating.toFixed(1) },
                            { label: '강의 수', value: '12개' },
                            { label: '수강 후기', value: `${(course.reviewCount * 1.8).toLocaleString('ko-KR', { maximumFractionDigits: 0 })}+` },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="p-3 rounded-lg text-center"
                              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                            >
                              <p
                                className="text-lg font-bold"
                                style={{ color: 'var(--color-text)' }}
                              >
                                {stat.value}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT (1/3) - 가격 카드, 데스크톱 sticky */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div
              className="sticky top-24 rounded-xl border p-6"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* 썸네일 */}
              <div
                className="w-full h-44 rounded-lg mb-5 flex items-center justify-center"
                style={{ background: course.thumbnail }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                  <Play size={24} style={{ color: 'var(--color-brand)' }} />
                </div>
              </div>

              {/* 가격 */}
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text)' }}
                >
                  {course.price.toLocaleString()}원
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {course.originalPrice.toLocaleString()}원
                </span>
              </div>
              <p className="text-sm font-semibold mb-5" style={{ color: 'var(--color-error)' }}>
                {discount}% 할인
              </p>

              {/* CTA */}
              <Button variant="primary" size="lg" fullWidth>
                수강 신청
              </Button>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: liked ? 'var(--color-error)' : 'var(--color-text-secondary)',
                  }}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={16} fill={liked ? 'var(--color-error)' : 'none'} />
                  찜하기
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <Share2 size={16} />
                  공유하기
                </button>
              </div>

              {/* 과정 포함 사항 */}
              <div
                className="mt-6 pt-6"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <h4
                  className="text-sm font-bold mb-4"
                  style={{ color: 'var(--color-text)' }}
                >
                  과정 포함 사항
                </h4>
                <ul className="space-y-3">
                  {[
                    { icon: Clock, label: '총 학습 시간', value: course.duration },
                    { icon: BookOpen, label: '강의 수', value: `${course.lessonsCount}개` },
                    { icon: BarChart3, label: '난이도', value: course.level },
                    { icon: Award, label: '수료증', value: '발급 가능' },
                  ].map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-center gap-3 text-sm">
                      <Icon size={16} style={{ color: 'var(--color-text-muted)' }} />
                      <span
                        className="flex-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {label}
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
