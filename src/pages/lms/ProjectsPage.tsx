// 프로젝트 갤러리 페이지 — Skillshare 스타일
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Eye, MessageCircle, Calendar, Search } from "lucide-react";
import { projects } from "../../data/projects";
import SectionHeading from "../../components/common/SectionHeading";

/* ── 모든 태그 추출 ── */
function extractTags(items: typeof projects): string[] {
  const tagSet = new Set<string>();
  items.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}

export default function ProjectsPage() {
  const allTags = useMemo(() => extractTags(projects), []);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // 필터링
  const filtered = useMemo(() => {
    let result = projects;
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedTag, search]);

  return (
    <div className="container-page py-10">
      {/* ── 헤더 ── */}
      <SectionHeading
        title="학습 프로젝트 갤러리"
        subtitle="학습자들이 직접 만든 프로젝트를 탐색하고 영감을 얻어보세요"
      />

      {/* ── 검색 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="max-w-md mx-auto mb-6"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] focus-within:border-[var(--color-brand)] transition-colors"
          style={{ backgroundColor: "var(--color-bg-secondary)" }}
        >
          <Search size={16} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none"
          />
        </div>
      </motion.div>

      {/* ── 필터 태그 ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        <button
          onClick={() => setSelectedTag(null)}
          className={[
            "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer",
            selectedTag === null
              ? "text-white"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
          ].join(" ")}
          style={
            selectedTag === null
              ? {
                  backgroundColor: "var(--color-brand)",
                  borderColor: "var(--color-brand)",
                }
              : { borderColor: "var(--color-border)" }
          }
        >
          전체
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setSelectedTag((prev) => (prev === tag ? null : tag))
            }
            className={[
              "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer",
              selectedTag === tag
                ? "text-white"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
            ].join(" ")}
            style={
              selectedTag === tag
                ? {
                    backgroundColor: "var(--color-brand)",
                    borderColor: "var(--color-brand)",
                  }
                : { borderColor: "var(--color-border)" }
            }
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* ── 프로젝트 그리드 ── */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-[var(--color-text-muted)] text-sm"
          >
            검색 결과가 없습니다.
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── 프로젝트 카드 Props ── */
interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  key?: string | number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-border-hover)] hover:shadow-md transition-all group cursor-pointer"
    >
      {/* 썸네일 */}
      <div
        className="h-40 relative overflow-hidden"
        style={{ background: project.thumbnail }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* 본문 */}
      <div className="p-4">
        {/* 작성자 */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{
              backgroundColor: "var(--color-brand)",
              color: "#ffffff",
            }}
          >
            {project.authorAvatar}
          </div>
          <span className="text-xs text-[var(--color-text-secondary)]">
            {project.author}
          </span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
            <Calendar size={10} />
            {project.createdAt}
          </span>
        </div>

        {/* 제목 + 설명 */}
        <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* 태그 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-bg-tertiary)",
                color: "var(--color-text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 통계 */}
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <Heart size={12} />
            {project.likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {project.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={12} />
            {/* views를 comments로 활용 — 원본 데이터에 comments 필드 없음 */}
            {Math.floor(project.views / 50)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
