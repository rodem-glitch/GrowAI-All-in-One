// ExplorePage — Udemy/Coursera 스타일 교육과정 탐색 페이지
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { courses, type Course } from '../../data/courses';

// --- 카테고리 탭 ---
const CATEGORIES = [
  '전체',
  '스마트공장',
  '품질경영',
  '자동화',
  '안전',
  'AI',
  '데이터',
  '국비지원',
] as const;

type Category = (typeof CATEGORIES)[number];

// --- 정렬 옵션 ---
const SORT_OPTIONS = [
  { value: 'popular', label: '인기순' },
  { value: 'newest', label: '최신순' },
  { value: 'rating', label: '평점순' },
  { value: 'price', label: '가격순' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

// --- 확장된 mock 데이터 (스마트제조 도메인) ---
const mockCourses: Course[] = [
  ...courses,
  {
    id: 101,
    title: '스마트공장 MES 시스템 구축 실무',
    instructor: '김태호',
    avatar: '김태',
    rating: 4.8,
    reviewCount: 892,
    students: 6340,
    price: 119000,
    originalPrice: 179000,
    duration: '40시간',
    category: '스마트공장',
    badge: '베스트셀러',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: 'MES 시스템의 설계부터 구축, 운영까지 스마트공장 핵심 역량을 배웁니다.',
    level: '중급',
    lessonsCount: 120,
  },
  {
    id: 102,
    title: '품질경영(QMS) ISO 9001 완전 정복',
    instructor: '이정민',
    avatar: '이정',
    rating: 4.7,
    reviewCount: 654,
    students: 4120,
    price: 89000,
    originalPrice: 129000,
    duration: '32시간',
    category: '품질경영',
    badge: '추천',
    thumbnail: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    description: 'ISO 9001 품질경영시스템 인증 준비부터 내부심사까지 체계적으로 학습합니다.',
    level: '초급',
    lessonsCount: 96,
  },
  {
    id: 103,
    title: 'PLC 프로그래밍과 공장 자동화',
    instructor: '박성진',
    avatar: '박성',
    rating: 4.9,
    reviewCount: 1023,
    students: 7890,
    price: 139000,
    originalPrice: 199000,
    duration: '48시간',
    category: '자동화',
    badge: '베스트셀러',
    thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: 'PLC 기초부터 HMI/SCADA 연동, 실제 공장 자동화 프로젝트까지 진행합니다.',
    level: '중급',
    lessonsCount: 144,
  },
  {
    id: 104,
    title: '산업안전관리 실무 과정',
    instructor: '최수현',
    avatar: '최수',
    rating: 4.6,
    reviewCount: 478,
    students: 3560,
    price: 79000,
    originalPrice: 119000,
    duration: '28시간',
    category: '안전',
    badge: '신규',
    thumbnail: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    description: '산업안전보건법 기반의 안전관리 체계 수립과 위험성 평가 실무를 다룹니다.',
    level: '초급',
    lessonsCount: 84,
  },
  {
    id: 105,
    title: '제조 AI: 비전검사와 예지보전',
    instructor: '한영수',
    avatar: '한영',
    rating: 4.8,
    reviewCount: 756,
    students: 5230,
    price: 149000,
    originalPrice: 219000,
    duration: '44시간',
    category: 'AI',
    badge: '추천',
    thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    description: 'AI 비전검사, 예지보전(PdM) 등 제조 현장에 적용 가능한 AI 기술을 학습합니다.',
    level: '고급',
    lessonsCount: 128,
  },
  {
    id: 106,
    title: '제조 데이터 분석과 SPC',
    instructor: '윤지혜',
    avatar: '윤지',
    rating: 4.7,
    reviewCount: 543,
    students: 3890,
    price: 99000,
    originalPrice: 149000,
    duration: '36시간',
    category: '데이터',
    badge: '인기',
    thumbnail: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    description: '통계적 공정관리(SPC)와 데이터 기반 품질 분석 역량을 기릅니다.',
    level: '중급',
    lessonsCount: 108,
  },
  {
    id: 107,
    title: '[국비지원] 스마트제조 엔지니어 양성',
    instructor: '정현우',
    avatar: '정현',
    rating: 4.9,
    reviewCount: 1245,
    students: 9870,
    price: 0,
    originalPrice: 350000,
    duration: '120시간',
    category: '국비지원',
    badge: '베스트셀러',
    thumbnail: 'linear-gradient(135deg, #667eea 0%, #43e97b 100%)',
    description: '국비지원으로 수강 가능한 스마트제조 전문 인력 양성 과정입니다.',
    level: '초급',
    lessonsCount: 240,
  },
  {
    id: 108,
    title: '로봇 프로세스 자동화(RPA) 입문',
    instructor: '송미래',
    avatar: '송미',
    rating: 4.5,
    reviewCount: 312,
    students: 2340,
    price: 69000,
    originalPrice: 99000,
    duration: '22시간',
    category: '자동화',
    badge: '신규',
    thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    description: 'UiPath를 활용한 업무 자동화 기초부터 실무 적용까지 배웁니다.',
    level: '초급',
    lessonsCount: 64,
  },
  {
    id: 109,
    title: '6시그마 그린벨트 자격 과정',
    instructor: '이정민',
    avatar: '이정',
    rating: 4.8,
    reviewCount: 687,
    students: 4560,
    price: 109000,
    originalPrice: 159000,
    duration: '38시간',
    category: '품질경영',
    badge: '인기',
    thumbnail: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    description: 'DMAIC 방법론 기반의 6시그마 그린벨트 자격 취득을 위한 체계적 과정입니다.',
    level: '중급',
    lessonsCount: 112,
  },
  {
    id: 110,
    title: '[국비지원] AI 데이터 분석가 양성',
    instructor: '한영수',
    avatar: '한영',
    rating: 4.7,
    reviewCount: 934,
    students: 7650,
    price: 0,
    originalPrice: 280000,
    duration: '100시간',
    category: '국비지원',
    badge: '추천',
    thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    description: '국비지원 AI 데이터 분석 전문가 양성 과정. Python과 머신러닝 기초부터 실무까지.',
    level: '초급',
    lessonsCount: 200,
  },
  {
    id: 111,
    title: '스마트공장 IoT 센서 네트워크',
    instructor: '김태호',
    avatar: '김태',
    rating: 4.6,
    reviewCount: 389,
    students: 2870,
    price: 99000,
    originalPrice: 149000,
    duration: '34시간',
    category: '스마트공장',
    badge: '신규',
    thumbnail: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    description: 'IoT 센서 선정부터 데이터 수집, 클라우드 연동까지 스마트공장 IoT 인프라를 구축합니다.',
    level: '중급',
    lessonsCount: 98,
  },
  {
    id: 112,
    title: '화학물질 안전관리와 PSM',
    instructor: '최수현',
    avatar: '최수',
    rating: 4.5,
    reviewCount: 267,
    students: 1980,
    price: 89000,
    originalPrice: 129000,
    duration: '30시간',
    category: '안전',
    badge: '추천',
    thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: '공정안전관리(PSM) 제도의 이해와 화학물질 취급 안전관리 실무를 학습합니다.',
    level: '고급',
    lessonsCount: 86,
  },
];

const ITEMS_PER_PAGE = 8;

// --- 검색바 컴포넌트 ---
function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="교육과정, 주제, 강사명으로 검색..."
        className="
          w-full pl-12 pr-4 py-3.5 text-base rounded-xl
          bg-[var(--color-bg)] border border-[var(--color-border)]
          text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
          focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20
          transition-all shadow-sm
        "
      />
    </div>
  );
}

// --- 카테고리 탭 컴포넌트 ---
function CategoryTabs({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 min-w-max">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors
              ${
                active === cat
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)]'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- 정렬 셀렉트 ---
function SortSelect({
  value,
  onChange,
}: {
  value: SortValue;
  onChange: (v: SortValue) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortValue)}
      className="
        px-3 py-2 text-sm rounded-lg border border-[var(--color-border)]
        bg-[var(--color-bg)] text-[var(--color-text)]
        focus:outline-none focus:border-[var(--color-brand)]
        cursor-pointer
      "
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// --- CourseCard 컴포넌트 ---
function CourseCard({ course }: { course: Course }) {
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <Link
      to={`/course/${course.id}`}
      className="
        group flex flex-col rounded-xl border border-[var(--color-border)]
        bg-[var(--color-bg)] overflow-hidden
        hover:shadow-lg hover:border-[var(--color-border-hover)]
        transition-all duration-200
      "
    >
      {/* 썸네일 */}
      <div
        className="relative aspect-video w-full"
        style={{ background: course.thumbnail }}
      >
        {course.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--color-brand)] text-white">
            {course.badge}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-semibold text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-brand)] transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-[var(--color-text-muted)]">
          {course.instructor}
        </p>

        {/* 평점 */}
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-[var(--color-warning)]">
            {course.rating}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(course.rating)
                    ? 'fill-[var(--color-warning)] text-[var(--color-warning)]'
                    : 'text-[var(--color-border)]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            ({course.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.students.toLocaleString()}명
          </span>
        </div>

        {/* 가격 */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          {course.price === 0 ? (
            <span className="text-base font-bold text-[var(--color-success)]">
              무료
            </span>
          ) : (
            <>
              <span className="text-base font-bold text-[var(--color-text)]">
                {course.price.toLocaleString()}원
              </span>
              {course.originalPrice > course.price && (
                <>
                  <span className="text-xs text-[var(--color-text-muted)] line-through">
                    {course.originalPrice.toLocaleString()}원
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-error)]">
                    -{discount}%
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// --- CourseGrid 컴포넌트 ---
function CourseGrid({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium text-[var(--color-text-secondary)]">
          검색 결과가 없습니다
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          다른 검색어나 카테고리를 선택해 보세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// --- 페이지네이션 ---
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          p-2 rounded-lg border border-[var(--color-border)]
          text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors
        "
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-9 h-9 text-sm font-medium rounded-lg transition-colors
              ${
                page === currentPage
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
              }
            `}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          p-2 rounded-lg border border-[var(--color-border)]
          text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors
        "
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// === 메인 ExplorePage ===
export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('전체');
  const [sort, setSort] = useState<SortValue>('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // 필터링 + 정렬
  const filtered = useMemo(() => {
    let result = [...mockCourses];

    // 카테고리 필터
    if (category !== '전체') {
      result = result.filter((c) => c.category === category);
    }

    // 검색 필터
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // 정렬
    switch (sort) {
      case 'popular':
        result.sort((a, b) => b.students - a.students);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
    }

    return result;
  }, [search, category, sort]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 카테고리/검색 변경 시 1페이지로 복귀
  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    setCurrentPage(1);
  };

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setCurrentPage(1);
  };

  return (
    <section className="container-page py-8 pb-16">
      {/* 페이지 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
          교육과정 탐색
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          실무 역량을 키워줄 최고의 교육과정을 찾아보세요
        </p>
      </div>

      {/* 검색바 */}
      <div className="mb-6">
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      {/* 카테고리 탭 */}
      <div className="mb-6">
        <CategoryTabs active={category} onChange={handleCategoryChange} />
      </div>

      {/* 결과 수 + 정렬 */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[var(--color-text-secondary)]">
          총 <span className="font-semibold text-[var(--color-text)]">{filtered.length}개</span> 교육과정
        </p>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {/* 교육과정 그리드 */}
      <CourseGrid courses={paged} />

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
