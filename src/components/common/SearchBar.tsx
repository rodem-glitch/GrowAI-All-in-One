import { useRef, useState, useEffect, type ChangeEvent, type KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';

/* ── 타입 정의 ── */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/* ── 컴포넌트 ── */
export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = '검색...',
  className = '',
}: SearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 모바일 확장 시 자동 포커스
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
    if (e.key === 'Escape') {
      setExpanded(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* 데스크톱: 항상 보이는 검색 바 */}
      <div
        className="hidden sm:flex items-center w-full max-w-xs rounded-lg px-3 py-2 gap-2 transition-colors duration-150"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Search size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: 'var(--color-text)' }}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center cursor-pointer"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="검색어 지우기"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* 모바일: 아이콘 -> 확장 */}
      <div className="flex sm:hidden items-center">
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="p-2 rounded-lg cursor-pointer transition-colors duration-150"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="검색 열기"
          >
            <Search size={20} />
          </button>
        ) : (
          <div
            className="flex items-center w-full rounded-lg px-3 py-2 gap-2 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
              position: 'absolute',
              inset: 0,
              zIndex: 10,
            }}
          >
            <Search size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm min-w-0"
              style={{ color: 'var(--color-text)' }}
            />
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                onChange('');
              }}
              className="flex items-center justify-center cursor-pointer"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="검색 닫기"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
