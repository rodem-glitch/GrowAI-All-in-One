import type { CSSProperties, ReactNode } from 'react';

/* ── 타입 정의 ── */
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* ── 변형별 스타일 ── */
const variantStyles: Record<BadgeVariant, CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-bg-tertiary)',
    color: 'var(--color-text-secondary)',
  },
  success: {
    backgroundColor: '#ecfdf5',
    color: 'var(--color-success)',
  },
  warning: {
    backgroundColor: '#fffbeb',
    color: 'var(--color-warning)',
  },
  danger: {
    backgroundColor: '#fef2f2',
    color: 'var(--color-error)',
  },
  info: {
    backgroundColor: '#eff6ff',
    color: 'var(--color-brand)',
  },
};

/* ── 컴포넌트 ── */
export default function Badge({
  variant = 'default',
  children,
  className = '',
  style,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}
      style={{ ...variantStyles[variant], ...style }}
    >
      {children}
    </span>
  );
}
