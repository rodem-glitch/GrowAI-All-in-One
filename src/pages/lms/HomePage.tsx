// HomePage — GrowAI LMS 소셜 특화 랜딩 페이지
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading';
import { CourseGrid } from '../../components/course';
import { LearningPathCard } from '../../components/course';
import { ActivityFeed, ProjectCard, DiscussionCard } from '../../components/social';
import type { CourseCardProps } from '../../components/course';
import type { ActivityItem } from '../../components/social/ActivityFeed';
import type { Discussion } from '../../components/social/DiscussionCard';

// --- 목 데이터 ---

const featuredCourses: CourseCardProps[] = [
  {
    id: '1',
    title: 'React 완전 정복: 기초부터 실전까지',
    instructor: '김민수',
    instructorInitial: '김',
    category: 'dev',
    badge: '베스트셀러',
    rating: 4.8,
    ratingCount: 1243,
    price: 89000,
    originalPrice: 129000,
    duration: '42시간',
    students: 8920,
    level: '중급',
  },
  {
    id: '2',
    title: 'Python 데이터 분석 마스터클래스',
    instructor: '이서연',
    instructorInitial: '이',
    category: 'data',
    badge: '신규',
    rating: 4.9,
    ratingCount: 987,
    price: 99000,
    originalPrice: 149000,
    duration: '38시간',
    students: 6540,
    level: '초급',
  },
  {
    id: '5',
    title: 'AI/ML 입문: 머신러닝 첫걸음',
    instructor: '최영진',
    instructorInitial: '최',
    category: 'ai',
    badge: '추천',
    rating: 4.8,
    ratingCount: 876,
    price: 119000,
    originalPrice: 179000,
    duration: '45시간',
    students: 7120,
    level: '초급',
  },
  {
    id: '7',
    title: 'Next.js 14 풀스택 개발',
    instructor: '김민수',
    instructorInitial: '김',
    category: 'dev',
    badge: '베스트셀러',
    rating: 4.9,
    ratingCount: 1087,
    price: 99000,
    originalPrice: 149000,
    duration: '36시간',
    students: 5430,
    level: '중급',
  },
];

const recentActivities: ActivityItem[] = [
  {
    id: 1,
    userName: '김서연',
    userAvatar: '김서',
    type: '완료',
    content: 'React 완전 정복 강좌를 수료했습니다.',
    detail: '42시간 과정을 28일 만에 완료!',
    tags: ['React', '프론트엔드'],
    timestamp: '2분 전',
    initialLikes: 24,
    initialComments: 5,
  },
  {
    id: 2,
    userName: '이준호',
    userAvatar: '이준',
    type: '프로젝트',
    content: 'AI 기반 이미지 분류 웹앱 프로젝트를 공유했습니다.',
    tags: ['AI', 'TensorFlow', 'React'],
    timestamp: '5분 전',
    initialLikes: 18,
    initialComments: 3,
  },
  {
    id: 3,
    userName: '박하은',
    userAvatar: '박하',
    type: '토론',
    content: 'AI 시대의 개발자 역량에 대한 토론에 참여했습니다.',
    tags: ['커리어', 'AI'],
    timestamp: '8분 전',
    initialLikes: 32,
    initialComments: 12,
  },
];

const learningPathsData = [
  {
    id: 1,
    title: '프론트엔드 엔지니어',
    description: 'React, TypeScript, Next.js를 마스터하고 실무 프로젝트를 완성하는 체계적 학습 경로',
    courseCount: 8,
    duration: '6개월',
    level: '초급',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 2,
    title: 'AI/ML 엔지니어',
    description: 'Python 기초부터 딥러닝, NLP까지 AI 엔지니어로 성장하는 종합 커리큘럼',
    courseCount: 10,
    duration: '8개월',
    level: '중급',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 3,
    title: '클라우드 아키텍트',
    description: 'AWS, Docker, Kubernetes를 활용한 클라우드 인프라 설계 및 운영 역량 확보',
    courseCount: 6,
    duration: '5개월',
    level: '고급',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

const projectsData = [
  {
    id: 'p-1',
    title: 'AI 기반 이미지 분류 웹앱',
    description: 'TensorFlow.js를 활용한 실시간 이미지 분류 데모 애플리케이션',
    authorName: '최영진',
    tags: ['AI', 'React', 'TensorFlow'],
    likes: 128,
    views: 1420,
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
  },
  {
    id: 'p-2',
    title: '실시간 협업 코드 에디터',
    description: 'WebSocket 기반 다중 사용자 코드 에디터 with 실시간 커서 공유',
    authorName: '김민수',
    tags: ['WebSocket', 'TypeScript', 'Monaco'],
    likes: 96,
    views: 890,
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
  },
];

const discussionsData: Discussion[] = [
  {
    id: 1,
    title: 'React Server Components vs Client Components, 언제 어떤 걸 써야 할까요?',
    author: '박준혁',
    authorAvatar: '박준',
    category: '토론',
    preview: 'Next.js 14에서 RSC를 적극 활용하고 있는데, 클라이언트 컴포넌트와의 경계를 어떻게 설정하시나요?',
    replies: 24,
    views: 1280,
    likes: 67,
    tags: ['React', 'Next.js', 'RSC'],
  },
  {
    id: 2,
    title: 'AI 코딩 어시스턴트, 실무에서 얼마나 활용하시나요?',
    author: '이서연',
    authorAvatar: '이서',
    category: '질문',
    preview: 'Copilot, Cursor 등 AI 도구를 실무에서 사용하면서 느낀 장단점을 공유해주세요.',
    replies: 42,
    views: 2340,
    likes: 89,
    tags: ['AI', '생산성', '도구'],
  },
];

// --- 통계 항목 ---
const stats = [
  { icon: Users, value: '12,000+', label: '학습자' },
  { icon: Building2, value: '450+', label: '기업' },
  { icon: TrendingUp, value: '94%', label: '만족도' },
];

// --- 애니메이션 variant ---
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.5 },
};

// === 메인 컴포넌트 ===
export default function HomePage() {
  return (
    <div>
      {/* ── 1. Hero 섹션 — LearnForm 스타일 ── */}
      <section className="w-full text-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 dark:bg-[#0f1112]">
        <div className="max-w-5xl mx-auto">
          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold text-[#242727] dark:text-white leading-tight"
          >
            Less time learning.
            <br />
            More time growing.
          </motion.h1>

          {/* 서브 텍스트 */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-[#555c5d] dark:text-gray-400 mt-6 max-w-2xl mx-auto whitespace-pre-line"
          >
            {'GrowAI와 함께 더 빠르게 성장하세요.\n누구나 쉽게 사용할 수 있는 올인원 소셜 학습 플랫폼.'}
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex gap-4 justify-center flex-wrap"
          >
            <Link to="/explore" className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: '#14a1c8', color: '#14a1c8' }}>
              둘러보기
            </Link>
            <Link to="/try" className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: '#14a1c8', color: '#14a1c8' }}>
              무료 체험
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-[#555c5d] dark:text-gray-500 mt-4"
          >
            신용카드 불필요
          </motion.p>

          {/* 파트너 뱃지 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4 sm:gap-8 mt-8 justify-center flex-wrap"
          >
            {['SparkLabs', 'Bon Angels', 'FuturePlay', 'Primer', 'Korea Investment Partners'].map((name) => (
              <div key={name}
                className="border-2 text-sm font-semibold px-6 py-3 rounded-lg flex items-center justify-center min-w-[120px] transition-colors duration-200"
                style={{ borderColor: '#1a5276', color: '#0c2d48', backgroundColor: 'rgba(30, 100, 160, 0.08)' }}>
                {name}
              </div>
            ))}
          </motion.div>

          {/* 비디오 플레이스홀더 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 rounded-2xl bg-gradient-to-br from-[#14a1c8]/20 to-[#107f9e]/10 dark:from-[#14a1c8]/10 dark:to-[#107f9e]/5 h-[300px] sm:h-[400px] flex items-center justify-center"
          >
            <button className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/60 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-white/80 transition-colors duration-200 group">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 translate-x-0.5" style={{ color: '#14a1c8' }}>
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. 실시간 활동 — LearnForm 카드 스타일 ── */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            지금 이 순간, 학습자들의 활동
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            GrowAI에서 함께 성장하는 학습자들의 실시간 활동을 확인하세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {recentActivities.map((activity, i) => {
              const gradients = [
                'from-blue-100 to-cyan-50',
                'from-purple-100 to-pink-50',
                'from-green-100 to-emerald-50',
              ];
              const titles = ['과정 수료', '프로젝트 공유', '토론 참여'];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <div className={`h-32 bg-gradient-to-br ${gradients[i % 3]} dark:opacity-80 rounded-xl mb-4 flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-[#242727]/10">{activity.userName.slice(0, 1)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#242727] dark:text-white">{titles[i % 3]}</h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">{activity.content}</p>
                  <span className="text-sm mt-3 inline-block hover:underline" style={{ color: '#14a1c8' }}>
                    {activity.userName} / {activity.timestamp}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. 인기 교육과정 — LearnForm 카드 스타일 ── */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            인기 교육과정
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            현업 전문가가 만든 실무 중심 교육과정
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {featuredCourses.map((course, i) => {
              const gradients = [
                'from-blue-100 to-cyan-50',
                'from-purple-100 to-pink-50',
                'from-green-100 to-emerald-50',
                'from-orange-100 to-yellow-50',
              ];
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <div className={`h-48 bg-gradient-to-br ${gradients[i % 4]} dark:opacity-80 rounded-xl mb-4`} />
                  <h3 className="text-lg font-semibold text-[#242727] dark:text-white">{course.title}</h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">
                    {course.instructor} / {course.duration} / {course.level}
                  </p>
                  <Link to={`/course/${course.id}`} className="text-sm mt-3 inline-block hover:underline" style={{ color: '#14a1c8' }}>
                    자세히 보기 →
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. AI 맞춤 학습 경로 — LearnForm 카드 스타일 ── */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            AI 맞춤 학습 경로
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            AI가 분석한 최적의 학습 로드맵으로 체계적으로 성장하세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {learningPathsData.map((path, i) => {
              const gradients = [
                'from-green-100 to-emerald-50',
                'from-purple-100 to-indigo-50',
                'from-orange-100 to-rose-50',
              ];
              return (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <div className={`h-40 bg-gradient-to-br ${gradients[i % 3]} dark:opacity-80 rounded-xl mb-4`} />
                  <h3 className="text-lg font-semibold text-[#242727] dark:text-white">{path.title}</h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">{path.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#555c5d]">
                    <span>{path.courseCount}개 과정</span>
                    <span>{path.duration}</span>
                    <span>{path.level}</span>
                  </div>
                  <a href="#" className="text-sm mt-3 inline-block hover:underline" style={{ color: '#14a1c8' }}>
                    시작하기 →
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. 활발한 학습 커뮤니티 — LearnForm 카드 스타일 ── */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#242727] dark:text-white">
            활발한 학습 커뮤니티
          </h2>
          <p className="text-lg text-[#555c5d] dark:text-gray-400 text-center mt-4 max-w-2xl mx-auto">
            프로젝트를 공유하고 토론에 참여하며 함께 성장하세요
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {projectsData.map((project, i) => {
              const gradients = ['from-rose-100 to-amber-50', 'from-indigo-100 to-violet-50'];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <div className={`h-48 bg-gradient-to-br ${gradients[i % 2]} dark:opacity-80 rounded-xl mb-4`} />
                  <h3 className="text-lg font-semibold text-[#242727] dark:text-white">{project.title}</h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">{project.description}</p>
                  <a href="#" className="text-sm mt-3 inline-block hover:underline" style={{ color: '#14a1c8' }}>
                    자세히 보기 →
                  </a>
                </motion.div>
              );
            })}
            {discussionsData.map((disc, i) => {
              const gradients = ['from-cyan-100 to-sky-50', 'from-amber-100 to-orange-50'];
              return (
                <motion.div
                  key={disc.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}
                  className="border border-[#d7dadb] dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800"
                >
                  <div className={`h-48 bg-gradient-to-br ${gradients[i % 2]} dark:opacity-80 rounded-xl mb-4`} />
                  <h3 className="text-lg font-semibold text-[#242727] dark:text-white">{disc.title}</h3>
                  <p className="text-sm text-[#555c5d] dark:text-gray-400 mt-2">{disc.preview}</p>
                  <a href="#" className="text-sm mt-3 inline-block hover:underline" style={{ color: '#14a1c8' }}>
                    토론 참여 →
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CTA 섹션 — LearnForm 스타일 ── */}
      <section className="w-full text-center py-20 sm:py-28 px-4 dark:bg-[#0f1112]">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#242727] dark:text-white leading-tight"
          >
            Start growing today.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-[#555c5d] dark:text-gray-400 max-w-lg mx-auto"
          >
            12,000명 이상의 학습자가 GrowAI와 함께 성장하고 있습니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex gap-4 justify-center flex-wrap"
          >
            <Link to="/try" className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              style={{ borderColor: '#14a1c8', color: '#14a1c8' }}>
              무료 체험
            </Link>
            <Link to="/explore" className="px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#14a1c8' }}>
              둘러보기
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-sm text-[#555c5d] dark:text-gray-500 mt-4"
          >
            신용카드 불필요 / 언제든 취소 가능
          </motion.p>
        </div>
      </section>
    </div>
  );
}
