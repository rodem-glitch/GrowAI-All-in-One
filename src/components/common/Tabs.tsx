import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

/* ── 타입 정의 ── */
interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/* ── 컴포넌트 ── */
export default function Tabs({ tabs, activeId, onChange, className = '' }: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // 활성 탭 인디케이터 위치 계산
  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeTab = tabRefs.current.get(activeId);
    if (!container || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    setIndicator({
      left: tabRect.left - containerRect.left + container.scrollLeft,
      width: tabRect.width,
    });
  }, [activeId]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // 활성 탭이 보이도록 스크롤
  useEffect(() => {
    const activeTab = tabRefs.current.get(activeId);
    activeTab?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-auto scrollbar-none ${className}`}
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              type="button"
              onClick={() => onChange(tab.id)}
              className="relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer"
              style={{
                color: isActive ? 'var(--color-brand)' : 'var(--color-text-secondary)',
                backgroundColor: 'transparent',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 애니메이션 인디케이터 */}
      <motion.div
        className="absolute bottom-0 h-0.5"
        style={{ backgroundColor: 'var(--color-brand)' }}
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </div>
  );
}
