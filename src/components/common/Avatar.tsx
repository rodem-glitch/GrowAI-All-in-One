import type { AnchorHTMLAttributes, CSSProperties } from 'react';

/* ── 타입 정의 ── */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  online?: boolean;
  href?: string;
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  className?: string;
  style?: CSSProperties;
}

/* ── 크기 매핑 ── */
const sizePx: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const fontSizeMap: Record<AvatarSize, string> = {
  xs: '0.625rem',
  sm: '0.75rem',
  md: '0.875rem',
  lg: '1rem',
  xl: '1.25rem',
};

const indicatorSize: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 14,
};

/* ── 이름 해시 기반 색상 생성 ── */
const avatarColors = [
  '#0056d2', '#059669', '#d97706', '#dc2626', '#7c3aed',
  '#0891b2', '#c026d3', '#ea580c', '#4f46e5', '#0d9488',
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/* ── 컴포넌트 ── */
export default function Avatar({
  name,
  size = 'md',
  online,
  href,
  linkProps,
  className = '',
  style,
}: AvatarProps) {
  const px = sizePx[size];
  const bgColor = avatarColors[hashName(name) % avatarColors.length];

  const avatar = (
    <div
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: px, height: px, ...style }}
    >
      {/* 이니셜 원 */}
      <div
        className="w-full h-full rounded-full flex items-center justify-center font-semibold select-none"
        style={{
          backgroundColor: bgColor,
          color: '#ffffff',
          fontSize: fontSizeMap[size],
          lineHeight: 1,
        }}
      >
        {getInitials(name)}
      </div>

      {/* 온라인 표시 */}
      {online !== undefined && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2"
          style={{
            width: indicatorSize[size],
            height: indicatorSize[size],
            backgroundColor: online ? 'var(--color-success)' : 'var(--color-text-muted)',
            borderColor: 'var(--color-bg)',
          }}
        />
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} {...linkProps} className="inline-flex">
        {avatar}
      </a>
    );
  }

  return avatar;
}
